// package com.luckyhelmet.order.dto;

// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Positive;

// public record OrderItemRequest(
//   @NotBlank String productId,
//   @Positive  int quantity
// ) {}
package com.luckyhelmet.order.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

/**
 * One line item in an order.
 * - productId, quantity are required.
 * - source is optional: "products" | "sealed_inventory" | "new_products".
 *   If null/blank, your service should default to "products".
 * - unitPrice is optional: if provided (>0), your service can trust it or re-fetch from DB.
 * - nameOverride is optional label to store on the order line; service may ignore if null.
 */
public record OrderItemRequest(
    @NotBlank String productId,
    @Positive  int quantity,

    // Optional source collection for inventory: null => default "products"
    @Pattern(regexp = "products|sealed_inventory|new_products")
    String source,

    // Optional client-sent price; validation ignores nulls
    @DecimalMin(value = "0.0", inclusive = true)
    Double unitPrice,

    // Optional display name override
    String nameOverride
) {}
