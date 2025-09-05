// src/main/java/com/luckyhelmet/order/dto/CreateOrderRequest.java
package com.luckyhelmet.order.dto;

import jakarta.validation.constraints.*;
import java.util.List;

public record CreateOrderRequest(
    @Email @NotBlank String email,
    @NotNull @Size(min = 1) List<OrderItemRequest> items,
    @NotNull Address shippingAddress,   // required
    Address billingAddress              // optional; null => use shipping
) {
  public static record Address(
      @NotBlank String name,
      @NotBlank String street,
      @NotBlank String city,
      @NotBlank String state,
      @Pattern(regexp="\\d{5}") String zip,
      String phone // optional
  ) {}
}
