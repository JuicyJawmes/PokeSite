package com.luckyhelmet.order;

import com.luckyhelmet.order.dto.CreateOrderRequest;
import java.util.List;

public class Order {
  private String id;
  private String email;
  private List<OrderItem> items;

  private double subtotal;
  private double tax;
  private double shipping;
  private double total;

  private String status;
  private long createdAt;

  // Addresses
  private CreateOrderRequest.Address shippingAddress;
  private CreateOrderRequest.Address billingAddress;

  // ---- getters/setters ----
  public String getId() { return id; }
  public void setId(String id) { this.id = id; }

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public List<OrderItem> getItems() { return items; }
  public void setItems(List<OrderItem> items) { this.items = items; }

  public double getSubtotal() { return subtotal; }
  public void setSubtotal(double subtotal) { this.subtotal = subtotal; }

  public double getTax() { return tax; }
  public void setTax(double tax) { this.tax = tax; }

  public double getShipping() { return shipping; }
  public void setShipping(double shipping) { this.shipping = shipping; }

  public double getTotal() { return total; }
  public void setTotal(double total) { this.total = total; }

  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }

  public long getCreatedAt() { return createdAt; }
  public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }

  public CreateOrderRequest.Address getShippingAddress() { return shippingAddress; }
  public void setShippingAddress(CreateOrderRequest.Address shippingAddress) { this.shippingAddress = shippingAddress; }

  public CreateOrderRequest.Address getBillingAddress() { return billingAddress; }
  public void setBillingAddress(CreateOrderRequest.Address billingAddress) { this.billingAddress = billingAddress; }
}
