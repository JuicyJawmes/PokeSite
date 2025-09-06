// src/main/java/com/luckyhelmet/product/dto/ProductPatch.java
package com.luckyhelmet.product.dto;

import jakarta.validation.constraints.NotBlank;

public class ProductPatch {
  @NotBlank
  private String id;

  private String  name;
  private String  imageUrl;
  private Double  price;
  private Integer quantity;
  private String  description;
  private String  cardId;
  private String  type;
  private Boolean storefront;

  public ProductPatch() {}

  // --- getters ---
  public String getId() { return id; }
  public String getName() { return name; }
  public String getImageUrl() { return imageUrl; }
  public Double getPrice() { return price; }
  public Integer getQuantity() { return quantity; }
  public String getDescription() { return description; }
  public String getCardId() { return cardId; }
  public String getType() { return type; }
  public Boolean getStorefront() { return storefront; }

  // --- setters ---
  public void setId(String id) { this.id = id; }
  public void setName(String name) { this.name = name; }
  public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
  public void setPrice(Double price) { this.price = price; }
  public void setQuantity(Integer quantity) { this.quantity = quantity; }
  public void setDescription(String description) { this.description = description; }
  public void setCardId(String cardId) { this.cardId = cardId; }
  public void setType(String type) { this.type = type; }
  public void setStorefront(Boolean storefront) { this.storefront = storefront; }
}
