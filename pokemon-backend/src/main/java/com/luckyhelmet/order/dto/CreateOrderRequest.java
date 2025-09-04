package com.luckyhelmet.order.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record CreateOrderRequest(
  @Email String email,                          // optional but recommended
  @NotEmpty List<@Valid OrderItemRequest> items
) {}
