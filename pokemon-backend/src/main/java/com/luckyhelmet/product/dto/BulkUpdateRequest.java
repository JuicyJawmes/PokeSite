// src/main/java/com/luckyhelmet/product/dto/BulkUpdateRequest.java
package com.luckyhelmet.product.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class BulkUpdateRequest {
  @NotEmpty
  private List<ProductPatch> patches;

  public List<ProductPatch> getPatches() { return patches; }
  public void setPatches(List<ProductPatch> patches) { this.patches = patches; }
}
