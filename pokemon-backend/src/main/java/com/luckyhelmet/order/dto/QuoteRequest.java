package com.luckyhelmet.order.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record QuoteRequest(
  @NotEmpty List<@Valid OrderItemRequest> items
) {}
