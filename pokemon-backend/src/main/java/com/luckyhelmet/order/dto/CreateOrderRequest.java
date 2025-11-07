// package com.luckyhelmet.order.dto;

// import jakarta.validation.constraints.*;
// import java.util.List;

// public class CreateOrderRequest {
//   @Email @NotBlank
//   private String email;

//   @NotNull @Size(min = 1)
//   private List<OrderItemRequest> items;

//   @NotNull
//   private Address shippingAddress;     // required

//   private Address billingAddress;      // optional; if null, use shipping

//   public CreateOrderRequest() {}

//   // ---- getters/setters for outer class (only if you need them) ----
//   public String getEmail() { return email; }
//   public void setEmail(String email) { this.email = email; }

//   public List<OrderItemRequest> getItems() { return items; }
//   public void setItems(List<OrderItemRequest> items) { this.items = items; }

//   public Address getShippingAddress() { return shippingAddress; }
//   public void setShippingAddress(Address shippingAddress) { this.shippingAddress = shippingAddress; }

//   public Address getBillingAddress() { return billingAddress; }
//   public void setBillingAddress(Address billingAddress) { this.billingAddress = billingAddress; }

//   // ---------- inner types ----------
//   public static class Address {
//     @NotBlank private String name;
//     @NotBlank private String street;
//     @NotBlank private String city;
//     @NotBlank private String state;
//     @Pattern(regexp="\\d{5}") private String zip;
//     private String phone; // optional

//     public Address() {}

//     // getters/setters
//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }

//     public String getStreet() { return street; }
//     public void setStreet(String street) { this.street = street; }

//     public String getCity() { return city; }
//     public void setCity(String city) { this.city = city; }

//     public String getState() { return state; }
//     public void setState(String state) { this.state = state; }

//     public String getZip() { return zip; }
//     public void setZip(String zip) { this.zip = zip; }

//     public String getPhone() { return phone; }
//     public void setPhone(String phone) { this.phone = phone; }
//   }

//   public static class OrderItemRequest {
//     @NotBlank private String productId;
//     @Min(1) private int quantity;
//     public OrderItemRequest() {}
//     public String getProductId() { return productId; }
//     public void setProductId(String productId) { this.productId = productId; }
//     public int getQuantity() { return quantity; }
//     public void setQuantity(int quantity) { this.quantity = quantity; }
//   }
// }
package com.luckyhelmet.order.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public class CreateOrderRequest {
  @NotBlank
  private String cartId;

  @Email
  @NotBlank
  private String email;

  @NotNull
  @Size(min = 1)
  private List<OrderItemRequest> items;

  @NotNull
  private Address shippingAddress;

  private Address billingAddress;

  // getters/setters
  public String getCartId() { return cartId; }
  public void setCartId(String cartId) { this.cartId = cartId; }

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public List<OrderItemRequest> getItems() { return items; }
  public void setItems(List<OrderItemRequest> items) { this.items = items; }

  public Address getShippingAddress() { return shippingAddress; }
  public void setShippingAddress(Address shippingAddress) { this.shippingAddress = shippingAddress; }

  public Address getBillingAddress() { return billingAddress; }
  public void setBillingAddress(Address billingAddress) { this.billingAddress = billingAddress; }

  // ---------- nested types (MUST stay inside this class) ----------
  public static class Address {
    @NotBlank private String name;
    @NotBlank private String street;
    @NotBlank private String city;
    @NotBlank private String state;
    @NotBlank private String zip;

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
  }

  public static class OrderItemRequest {
    @NotBlank
    private String productId;

    @Min(1)
    @Max(99)
    private int quantity;

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
  }
}
