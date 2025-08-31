package com.luckyhelmet.product;

import com.luckyhelmet.product.dto.ProductRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class ProductController {

  private final ProductService svc;

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

  // @GetMapping("/products")
  // public List<Product> list() throws ExecutionException, InterruptedException {
  //   return svc.list();
  // }

  @GetMapping("/products/{id}")
  public ResponseEntity<Product> get(@PathVariable String id)
      throws ExecutionException, InterruptedException {
    Product p = svc.get(id);
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
}
