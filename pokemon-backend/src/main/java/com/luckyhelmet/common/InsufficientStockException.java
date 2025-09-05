// src/main/java/com/luckyhelmet/common/InsufficientStockException.java
package com.luckyhelmet.common;

public class InsufficientStockException extends RuntimeException {
  private final String productId;
  private final String name;
  private final int available;
  private final int requested;

  public InsufficientStockException(String productId, String name, int available, int requested) {
    super("INSUFFICIENT_STOCK");
    this.productId = productId;
    this.name = name;
    this.available = available;
    this.requested = requested;
  }
  public String getProductId() { return productId; }
  public String getName() { return name; }
  public int getAvailable() { return available; }
  public int getRequested() { return requested; }
}
