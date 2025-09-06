package com.luckyhelmet.product;

import com.luckyhelmet.product.dto.ProductRequest;
import com.luckyhelmet.product.dto.BulkUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class ProductController {

  private final ProductService svc;

  @Value("${app.adminToken:}")
  private String adminToken;

  public ProductController(ProductService svc) {
    this.svc = svc;
  }

  @GetMapping("/products")
  public List<Product> list(@RequestParam(value = "storefront", required = false) Boolean storefront)
      throws ExecutionException, InterruptedException {
    List<Product> all = svc.list();
    if (Boolean.TRUE.equals(storefront)) {
      return all.stream()
          .filter(p -> p.getPrice() > 0)
          .filter(p -> p.getQuantity() > 0)
          .toList();
    }
    return all;
  }

  // Single product (fixed path + use svc)
  @GetMapping("/products/{id}")
  public ResponseEntity<Product> getOne(@PathVariable String id) throws Exception {
    Product p = svc.getById(id);
    return (p == null) ? ResponseEntity.notFound().build() : ResponseEntity.ok(p);
  }

  @PostMapping("/products")
  public ResponseEntity<Product> create(@Valid @RequestBody ProductRequest req)
      throws ExecutionException, InterruptedException {
    return ResponseEntity.ok(svc.create(req));
  }

  @PutMapping("/products/{id}")
  public ResponseEntity<Product> update(@PathVariable String id, @Valid @RequestBody ProductRequest req)
      throws ExecutionException, InterruptedException {
    return ResponseEntity.ok(svc.update(id, req));
  }

  @DeleteMapping("/products/{id}")
  public ResponseEntity<Void> delete(@PathVariable String id)
      throws ExecutionException, InterruptedException {
    svc.delete(id);
    return ResponseEntity.noContent().build();
  }

  // Admin bulk update (token-protected)
  @PostMapping("/admin/products/bulk")
  public ResponseEntity<?> bulkUpdateProducts(
      @RequestHeader(name = "X-Admin-Token", required = false) String token,
      @Valid @RequestBody BulkUpdateRequest body
  ) throws Exception {
    if (adminToken == null || adminToken.isBlank() || !Objects.equals(adminToken, token)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "forbidden"));
    }
    svc.applyBulkPatches(body.getPatches());
    return ResponseEntity.ok(Map.of("updated", body.getPatches().size()));
  }
}
