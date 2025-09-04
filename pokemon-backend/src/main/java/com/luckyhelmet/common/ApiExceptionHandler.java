package com.luckyhelmet.common;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

  // Stock / business-rule errors (e.g., "insufficient_stock:<productId>")
  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<Map<String, Object>> handleIllegalState(IllegalStateException ex) {
    String msg = ex.getMessage() == null ? "illegal_state" : ex.getMessage();
    HttpStatus status = msg.startsWith("insufficient_stock")
        ? HttpStatus.CONFLICT     // 409
        : HttpStatus.BAD_REQUEST; // 400
    Map<String, Object> body = new HashMap<>();
    body.put("error", msg);
    return ResponseEntity.status(status).body(body);
  }

  // Bean validation on @RequestBody DTOs
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
    Map<String, Object> body = new HashMap<>();
    body.put("error", "validation_failed");
    Map<String, String> fields = new HashMap<>();
    ex.getBindingResult().getFieldErrors()
        .forEach(fe -> fields.put(fe.getField(), fe.getDefaultMessage()));
    body.put("fields", fields);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
  }

  // Validation on @RequestParam / @PathVariable, etc.
  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<Map<String, Object>> handleConstraint(ConstraintViolationException ex) {
    Map<String, Object> body = new HashMap<>();
    body.put("error", "constraint_violation");
    body.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
  }

  // Last-resort handler
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, Object>> handleOther(Exception ex) {
    Map<String, Object> body = new HashMap<>();
    body.put("error", "internal_error");
    body.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
  }
}
