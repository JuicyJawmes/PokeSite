// src/main/java/com/luckyhelmet/product/ProductService.java
package com.luckyhelmet.product;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.luckyhelmet.product.dto.ProductPatch;
import com.luckyhelmet.product.dto.ProductRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class ProductService {
  private static final Logger log = LoggerFactory.getLogger(ProductService.class);

  private final Firestore db;
  private final CollectionReference products;

  public ProductService(Firestore firestore) {
    this.db = firestore;
    this.products = firestore.collection("products");
  }

  /* ---------------------------- Queries ---------------------------- */

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

  // Used by controller’s /products/{id}
  public Product getById(String id) throws Exception {
    DocumentSnapshot doc = products.document(id).get().get();
    if (!doc.exists()) return null;

    Product p = new Product();
    p.setId(doc.getId());
    p.setName(Objects.toString(doc.get("name"), null));

    // default type to "single"
    String type = Objects.toString(doc.get("type"), "single");
    p.setType(type == null || type.isBlank() ? "single" : type);

    // image fallback
    String img = Objects.toString(doc.get("imageUrl"),
                 Objects.toString(doc.get("image"), null));
    if (img == null || img.isBlank()) {
      img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
    }
    p.setImageUrl(img);

    // price: price -> marketValue -> 0.0
    Double price = null;
    Object priceObj = doc.get("price");
    if (priceObj instanceof Number n) price = n.doubleValue();
    if (price == null) {
      Object mv = doc.get("marketValue");
      if (mv instanceof Number n) price = n.doubleValue();
    }
    p.setPrice(price == null ? 0.0 : price);

    Object qty = doc.get("quantity");
    p.setQuantity((qty instanceof Number n) ? n.intValue() : 0);

    p.setDescription(Objects.toString(doc.get("description"), null));
    p.setPurchasePrice((doc.get("purchasePrice") instanceof Number n) ? n.doubleValue() : null);
    p.setCardId(Objects.toString(doc.get("cardId"), null));
    return p;
  }

  /* ---------------------------- Mutations ---------------------------- */

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

public void applyBulkPatches(List<ProductPatch> patches) throws Exception {
  if (patches == null || patches.isEmpty()) return;

  WriteBatch batch = db.batch(); // needs a Firestore field named `db` (see note below)

  for (ProductPatch p : patches) {
    if (p == null || p.getId() == null || p.getId().isBlank()) continue;

    DocumentReference ref = products.document(p.getId());
    Map<String, Object> updates = new HashMap<>();

    if (p.getName()        != null) updates.put("name", p.getName());
    if (p.getImageUrl()    != null) {
      updates.put("imageUrl", p.getImageUrl());
      // keep legacy "image" in sync if you previously used that field
      updates.put("image", p.getImageUrl());
    }
    if (p.getPrice()       != null) updates.put("price", p.getPrice());
    if (p.getQuantity()    != null) updates.put("quantity", p.getQuantity());
    if (p.getDescription() != null) updates.put("description", p.getDescription());
    if (p.getCardId()      != null) updates.put("cardId", p.getCardId());
    if (p.getType()        != null) updates.put("type", p.getType());
    if (p.getStorefront()  != null) updates.put("storefront", p.getStorefront());

    if (!updates.isEmpty()) {
      batch.set(ref, updates, SetOptions.merge());
    }
  }

  batch.commit().get();
}


  /* ---------------------------- Helpers ---------------------------- */

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

    String type = anyString(doc, "type", "category");
    p.setType(type != null && !type.isBlank() ? type : "single");

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

  private static Integer asIntObj(Object v) {
    if (v == null) return null;
    if (v instanceof Number n) return n.intValue();
    if (v instanceof String s) { try { return Integer.valueOf(s); } catch (Exception ignore) {} }
    return null;
  }

  private static Double asDoubleObj(Object v) {
    if (v == null) return null;
    if (v instanceof Number n) return n.doubleValue();
    if (v instanceof String s) { try { return Double.valueOf(s); } catch (Exception ignore) {} }
    return null;
  }
}
