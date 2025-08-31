package com.luckyhelmet.product;

public class Product {
    private String id;       // Firestore doc id
    private String name;
    private String type;     // "single" | "sealed"
    private String imageUrl;
    private double price;
    private int quantity;

    // optional extras your UI uses:
    private String description;
    private Double purchasePrice;
    private String cardId;

    // getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getType() { return type; }
    public String getImageUrl() { return imageUrl; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }
    public String getDescription() { return description; }
    public Double getPurchasePrice() { return purchasePrice; }
    public String getCardId() { return cardId; }

    // setters
    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setType(String type) { this.type = type; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setPrice(double price) { this.price = price; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public void setDescription(String description) { this.description = description; }
    public void setPurchasePrice(Double purchasePrice) { this.purchasePrice = purchasePrice; }
    public void setCardId(String cardId) { this.cardId = cardId; }
}
