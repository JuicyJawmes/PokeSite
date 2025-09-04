package com.luckyhelmet.order;

import com.google.cloud.firestore.*;
import com.luckyhelmet.order.dto.CreateOrderRequest;
import com.luckyhelmet.order.dto.OrderItemRequest;
import com.luckyhelmet.order.dto.QuoteRequest;
import com.luckyhelmet.order.dto.QuoteResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class OrderService {

  private final Firestore db;
  private final CollectionReference products;
  private final CollectionReference orders;

  @Value("${app.taxRate:0}")      private double taxRate;      // e.g. 0.0825
  @Value("${app.shippingFlat:0}") private double shippingFlat; // e.g. 4.99

  public OrderService(Firestore firestore) {
    this.db = firestore;
    this.products = firestore.collection("products");
    this.orders = firestore.collection("orders");
  }

  // ---------- QUOTE (no stock change) ----------
  public QuoteResponse quote(QuoteRequest req) throws ExecutionException, InterruptedException {
    var items = new ArrayList<QuoteResponse.QuotedItem>();
    double subtotal = 0.0;

    for (OrderItemRequest line : req.items()) {
      DocumentSnapshot doc = products.document(line.productId()).get().get();
      if (!doc.exists()) continue; // silently skip missing

      String name  = asString(doc.get("name"));
      String image = firstNonNullStr(doc.get("imageUrl"), doc.get("image"),
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png");
      double price = firstNonNullDouble(doc.get("price"), doc.get("marketValue"), 0.0);

      items.add(new QuoteResponse.QuotedItem(doc.getId(), name, image, price, line.quantity()));
      subtotal += price * line.quantity();
    }
    double tax = round2(subtotal * taxRate);
    double shipping = round2(shippingFlat);
    double total = round2(subtotal + tax + shipping);

    return new QuoteResponse(items, round2(subtotal), tax, shipping, total);
  }

  // ---------- CREATE ORDER (transaction: checks & decrements stock) ----------
  public Order create(CreateOrderRequest req) throws ExecutionException, InterruptedException {
    Order order = db.runTransaction(tx -> {
      List<OrderItem> orderItems = new ArrayList<>();
      double subtotal = 0.0;

      for (OrderItemRequest line : req.items()) {
        DocumentReference pref = products.document(line.productId());
        DocumentSnapshot doc = tx.get(pref).get();
        if (!doc.exists()) throw new IllegalStateException("product_not_found:" + line.productId());

        int available = toInt(doc.get("quantity"), 0);
        if (available < line.quantity())
          throw new IllegalStateException("insufficient_stock:" + line.productId());

        String name  = asString(doc.get("name"));
        String image = firstNonNullStr(doc.get("imageUrl"), doc.get("image"),
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png");
        double price = firstNonNullDouble(doc.get("price"), doc.get("marketValue"), 0.0);

        OrderItem oi = new OrderItem();
        oi.setProductId(doc.getId());
        oi.setName(name);
        oi.setImageUrl(image);
        oi.setPrice(price);
        oi.setQuantity(line.quantity());
        orderItems.add(oi);

        subtotal += price * line.quantity();

        // decrement stock
        tx.update(pref, "quantity", available - line.quantity());
      }

      double tax = round2(subtotal * taxRate);
      double shipping = round2(shippingFlat);
      double total = round2(subtotal + tax + shipping);

      Order o = new Order();
      DocumentReference oref = orders.document();
      o.setId(oref.getId());
      o.setEmail(req.email());
      o.setItems(orderItems);
      o.setSubtotal(round2(subtotal));
      o.setTax(tax);
      o.setShipping(shipping);
      o.setTotal(total);
      o.setStatus("PENDING");
      o.setCreatedAt(System.currentTimeMillis());

      tx.set(oref, orderToMap(o));
      return o;
    }).get();

    return order;
  }

  public Order get(String id) throws ExecutionException, InterruptedException {
    DocumentSnapshot doc = orders.document(id).get().get();
    if (!doc.exists()) return null;
    return mapOrder(doc);
  }

  // ---------- helpers ----------
  private static Map<String,Object> orderToMap(Order o) {
    Map<String,Object> m = new HashMap<>();
    m.put("email", o.getEmail());
    m.put("items", itemsToList(o.getItems()));
    m.put("subtotal", o.getSubtotal());
    m.put("tax", o.getTax());
    m.put("shipping", o.getShipping());
    m.put("total", o.getTotal());
    m.put("status", o.getStatus());
    m.put("createdAt", o.getCreatedAt());
    return m;
  }

  private static List<Map<String,Object>> itemsToList(List<OrderItem> items) {
    List<Map<String,Object>> out = new ArrayList<>();
    if (items == null) return out;
    for (OrderItem i : items) {
      Map<String,Object> m = new HashMap<>();
      m.put("productId", i.getProductId());
      m.put("name", i.getName());
      m.put("imageUrl", i.getImageUrl());
      m.put("price", i.getPrice());
      m.put("quantity", i.getQuantity());
      out.add(m);
    }
    return out;
  }

  private static Order mapOrder(DocumentSnapshot doc) {
    Order o = new Order();
    o.setId(doc.getId());
    o.setEmail(asString(doc.get("email")));
    o.setSubtotal(toDouble(doc.get("subtotal"),0));
    o.setTax(toDouble(doc.get("tax"),0));
    o.setShipping(toDouble(doc.get("shipping"),0));
    o.setTotal(toDouble(doc.get("total"),0));
    o.setStatus(asString(doc.get("status")));
    o.setCreatedAt(toLong(doc.get("createdAt"), System.currentTimeMillis()));

    List<Map<String,Object>> raw = (List<Map<String,Object>>) doc.get("items");
    List<OrderItem> items = new ArrayList<>();
    if (raw != null) {
      for (Map<String,Object> m : raw) {
        OrderItem it = new OrderItem();
        it.setProductId(asString(m.get("productId")));
        it.setName(asString(m.get("name")));
        it.setImageUrl(asString(m.get("imageUrl")));
        it.setPrice(toDouble(m.get("price"),0));
        it.setQuantity(toInt(m.get("quantity"),0));
        items.add(it);
      }
    }
    o.setItems(items);
    return o;
  }

  private static String firstNonNullStr(Object... xs) {
    for (Object x: xs) if (x != null && !String.valueOf(x).isBlank()) return String.valueOf(x);
    return null;
  }
  private static double firstNonNullDouble(Object a, Object b, double def) {
    Double x = toDoubleObj(a); if (x != null) return x;
    x = toDoubleObj(b);        if (x != null) return x;
    return def;
  }
  private static String asString(Object v) { return v == null ? null : String.valueOf(v); }
  private static Integer toInt(Object v, int def) {
    if (v instanceof Number n) return n.intValue();
    if (v instanceof String s) { try { return Integer.parseInt(s); } catch (Exception ignore) {} }
    return def;
  }
  private static Long toLong(Object v, long def) {
    if (v instanceof Number n) return n.longValue();
    if (v instanceof String s) { try { return Long.parseLong(s); } catch (Exception ignore) {} }
    return def;
  }
  private static Double toDoubleObj(Object v) {
    if (v instanceof Number n) return n.doubleValue();
    if (v instanceof String s) { try { return Double.valueOf(s); } catch (Exception ignore) {} }
    return null;
  }
  private static double toDouble(Object v, double def) { Double d = toDoubleObj(v); return d==null?def:d; }
  private static double round2(double x) { return Math.round(x * 100.0) / 100.0; }
}
