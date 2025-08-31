package com.luckyhelmet.product.dto;

import jakarta.validation.constraints.*;

public record ProductRequest(
    @NotBlank String name,
    String type,                 // optional
    String imageUrl,             // optional
    @PositiveOrZero double price,
    @PositiveOrZero int quantity,
    String description,          // optional
    Double purchasePrice,        // optional
    String cardId                // optional
) {}
