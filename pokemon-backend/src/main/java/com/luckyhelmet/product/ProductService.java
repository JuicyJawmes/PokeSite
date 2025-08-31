// src/main/java/com/luckyhelmet/product/ProductService.java
package com.luckyhelmet.product;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.luckyhelmet.product.dto.ProductRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ProductService {
  private static final Logger log = LoggerFactory.getLogger(ProductService.class);
  private final CollectionReference products;

  public ProductService(Firestore firestore) {
    this.products = firestore.collection("products");
  }

  public List<Product> list() throws ExecutionException, InterruptedException {
    List<Product> out = new ArrayList<>();
    ApiFuture<QuerySnapshot> future = products.get();
    for (DocumentSnapshot doc : future.get().getDocuments()) {
      try {
        out.add(mapDoc(doc));
      } catch (Exception e) {
        log.warn("Skipping product {} due to mapping error: {}", doc.getId(), e.toString());
      }
    }
    return out;
  }

  public Product get(String id) throws ExecutionException, InterruptedException {
    DocumentSnapshot doc = products.document(id).get().get();
    if (!doc.exists()) return null;
    return mapDoc(doc);
  }

  public Product create(ProductRequest req) throws ExecutionException, InterruptedException {
    Product p = toProduct(null, req);
    DocumentReference ref = products.document();
    p.setId(ref.getId());
    ref.set(p).get();
    return get(p.getId());
  }

  public Product update(String id, ProductRequest req) throws ExecutionException, InterruptedException {
    Product p = toProduct(id, req);
    products.document(id).set(p, SetOptions.merge()).get();
    return get(id);
  }

  public void delete(String id) throws ExecutionException, InterruptedException {
    products.document(id).delete().get();
  }

  // ---------- helpers ----------

 private static Product toProduct(String id, ProductRequest req) {
    Product p = new Product();
    p.setId(id);
    p.setName(req.name());
    p.setType(req.type());            // can be null
    p.setImageUrl(req.imageUrl());    // can be null
    p.setPrice(req.price());
    p.setQuantity(req.quantity());
    p.setDescription(req.description());
    p.setPurchasePrice(req.purchasePrice());
    p.setCardId(req.cardId());
    return p;
}

  private static Product mapDoc(DocumentSnapshot doc) {
    Product p = new Product();
    p.setId(doc.getId());

    p.setName(anyString(doc, "name", "title"));

    // default type when absent
    String type = anyString(doc, "type", "category");
    p.setType(type != null && !type.isBlank() ? type : "single");

    // default image placeholder when missing (use your own if you prefer)
    String img = anyString(doc, "imageUrl", "image", "img", "image_url");
    if (img == null || img.isBlank()) {
        img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
    }
    p.setImageUrl(img);

    Double price = anyDouble(doc, "price", "marketValue", "market_value");
    if (price == null) price = anyDouble(doc, "purchasePrice", "purchase_price");
    p.setPrice(price != null ? price : 0.0);

    Integer qty = anyInt(doc, "quantity", "qty", "stock");
    p.setQuantity(qty != null ? qty : 0);

    p.setDescription(anyString(doc, "description", "desc"));
    p.setPurchasePrice(anyDouble(doc, "purchasePrice", "purchase_price"));
    p.setCardId(anyString(doc, "cardId", "card_id"));
    return p;
}

private static String anyString(DocumentSnapshot doc, String... keys) {
    for (String k : keys) {
        Object v = doc.get(k);
        if (v != null) return String.valueOf(v);
    }
    return null;
}
private static Double anyDouble(DocumentSnapshot doc, String... keys) {
    for (String k : keys) {
        Double d = asDoubleObj(doc.get(k));
        if (d != null) return d;
    }
    return null;
}
private static Integer anyInt(DocumentSnapshot doc, String... keys) {
    for (String k : keys) {
        Integer i = asIntObj(doc.get(k));
        if (i != null) return i;
    }
    return null;
}

// private static Double asDoubleObj(Object v) {
//     if (v == null) return null;
//     if (v instanceof Number n) return n.doubleValue();
//     if (v instanceof String s) try { return Double.valueOf(s); } catch (Exception ignore) {}
//     return null;
// }
private static Integer asIntObj(Object v) {
    if (v == null) return null;
    if (v instanceof Number n) return n.intValue();
    if (v instanceof String s) try { return Integer.valueOf(s); } catch (Exception ignore) {}
    return null;
}

  // private static String asString(Object v) {
  //   return v == null ? null : String.valueOf(v);
  // }
  // private static double asDouble(Object v, double def) {
  //   if (v instanceof Number n) return n.doubleValue();
  //   if (v instanceof String s) { try { return Double.parseDouble(s); } catch (Exception ignore) {} }
  //   return def;
  // }
  private static Double asDoubleObj(Object v) {
    if (v == null) return null;
    if (v instanceof Number n) return n.doubleValue();
    if (v instanceof String s) { try { return Double.valueOf(s); } catch (Exception ignore) {} }
    return null;
  }
  // private static int asInt(Object v, int def) {
  //   if (v instanceof Number n) return n.intValue();
  //   if (v instanceof String s) { try { return Integer.parseInt(s); } catch (Exception ignore) {} }
  //   return def;
  // }
}
