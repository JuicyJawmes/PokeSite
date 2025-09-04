package com.luckyhelmet.order;

import com.luckyhelmet.order.dto.CreateOrderRequest;
import com.luckyhelmet.order.dto.QuoteRequest;
import com.luckyhelmet.order.dto.QuoteResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

  private final OrderService service;
  public OrderController(OrderService service) { this.service = service; }

  @PostMapping("/quote")
  public QuoteResponse quote(@Valid @RequestBody QuoteRequest req)
      throws ExecutionException, InterruptedException {
    return service.quote(req);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Order create(@Valid @RequestBody CreateOrderRequest req)
      throws ExecutionException, InterruptedException {
    return service.create(req);
  }

  @GetMapping("/{id}")
  public Order get(@PathVariable String id)
      throws ExecutionException, InterruptedException {
    return service.get(id);
  }
}
