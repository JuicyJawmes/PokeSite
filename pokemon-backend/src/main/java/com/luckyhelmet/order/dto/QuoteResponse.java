package com.luckyhelmet.order.dto;

import java.util.List;

public record QuoteResponse(
  List<QuotedItem> items,
  double subtotal,
  double tax,
  double shipping,
  double total
) {
  public record QuotedItem(String productId, String name, String imageUrl, double price, int quantity) {}
}
