package com.luckyhelmet.order;

import com.luckyhelmet.order.dto.CreateOrderRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class OrderController {

  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @PostMapping
  public ResponseEntity<Map<String, Object>> create(@RequestBody CreateOrderRequest req) throws Exception {
    String orderId = orderService.create(req); // now returns the ID
    return ResponseEntity.ok(Map.of("orderId", orderId));
  }

  @GetMapping("/{orderId}")
  public ResponseEntity<Map<String, Object>> get(@PathVariable String orderId) throws Exception {
    Map<String, Object> data = orderService.get(orderId); // raw doc map
    if (data == null || data.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(data);
  }
}
