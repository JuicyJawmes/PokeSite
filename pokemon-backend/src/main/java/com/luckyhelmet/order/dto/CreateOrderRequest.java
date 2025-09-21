// // src/main/java/com/luckyhelmet/order/dto/CreateOrderRequest.java
// package com.luckyhelmet.order.dto;

// import jakarta.validation.constraints.*;
// import java.util.List;

// public record CreateOrderRequest(
//     @Email @NotBlank String email,
//     @NotNull @Size(min = 1) List<OrderItemRequest> items,
//     @NotNull Address shippingAddress,   // required
//     Address billingAddress              // optional; null => use shipping
// ) {
//   public static record Address(
//       @NotBlank String name,
//       @NotBlank String street,
//       @NotBlank String city,
//       @NotBlank String state,
//       @Pattern(regexp="\\d{5}") String zip,
//       String phone // optional
//   ) {}
// }
// src/main/java/com/luckyhelmet/order/dto/CreateOrderRequest.java
package com.luckyhelmet.order.dto;

import jakarta.validation.constraints.*;
import java.util.List;

public class CreateOrderRequest {
  @Email @NotBlank
  private String email;

  @NotNull @Size(min = 1)
  private List<OrderItemRequest> items;

  @NotNull
  private Address shippingAddress;     // required

  private Address billingAddress;      // optional; if null, use shipping

  public CreateOrderRequest() {}

  // ---- getters/setters for outer class (only if you need them) ----
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public List<OrderItemRequest> getItems() { return items; }
  public void setItems(List<OrderItemRequest> items) { this.items = items; }

  public Address getShippingAddress() { return shippingAddress; }
  public void setShippingAddress(Address shippingAddress) { this.shippingAddress = shippingAddress; }

  public Address getBillingAddress() { return billingAddress; }
  public void setBillingAddress(Address billingAddress) { this.billingAddress = billingAddress; }

  // ---------- inner types ----------
  public static class Address {
    @NotBlank private String name;
    @NotBlank private String street;
    @NotBlank private String city;
    @NotBlank private String state;
    @Pattern(regexp="\\d{5}") private String zip;
    private String phone; // optional

    public Address() {}

    // getters/setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getZip() { return zip; }
    public void setZip(String zip) { this.zip = zip; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
  }

  public static class OrderItemRequest {
    @NotBlank private String productId;
    @Min(1) private int quantity;
    public OrderItemRequest() {}
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
  }
}
