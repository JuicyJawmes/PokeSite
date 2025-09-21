// src/main/java/com/luckyhelmet/payment/PaymentWebhookController.java
package com.luckyhelmet.payment;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.DocumentReference;
import com.luckyhelmet.order.Order;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@ConditionalOnProperty(prefix = "stripe", name = "webhook.secret", matchIfMissing = false)
public class PaymentWebhookController {

  private final Firestore db;
  private final String webhookSecret;

  public PaymentWebhookController(Firestore db,
      @Value("${stripe.webhook.secret}") String webhookSecret) {
    this.db = db;
    this.webhookSecret = webhookSecret;
  }

  @PostMapping("/webhook")
  public ResponseEntity<String> handle(
      @RequestHeader("Stripe-Signature") String sigHeader,
      @RequestBody String payload) {
    try {
      Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);

      switch (event.getType()) {
        case "payment_intent.succeeded" -> {
          var obj = event.getDataObjectDeserializer().getObject().orElse(null);
          if (obj instanceof com.stripe.model.PaymentIntent pi) {
            String orderId = pi.getMetadata().get("orderId");
            if (orderId != null && !orderId.isBlank()) {
              DocumentReference ref = db.collection("orders").document(orderId);
              ref.update("status", "PAID");
            }
          }
        }
        case "payment_intent.payment_failed" -> {
          // optional: log/alert
        }
      }
      return ResponseEntity.ok("ok");
    } catch (SignatureVerificationException e) {
      return ResponseEntity.badRequest().body("bad signature");
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("error");
    }
  }
}
