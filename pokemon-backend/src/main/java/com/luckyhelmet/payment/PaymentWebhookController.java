// src/main/java/com/luckyhelmet/payment/PaymentWebhookController.java
package com.luckyhelmet.payment;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.DocumentReference;
import com.luckyhelmet.order.Order;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentWebhookController {

  private final Firestore db;

  @Value("${stripe.webhook.secret}")
  private String webhookSecret;

  public PaymentWebhookController(Firestore db) { this.db = db; }

  @PostMapping("/webhook")
  public ResponseEntity<String> handle(@RequestHeader("Stripe-Signature") String sigHeader,
                                       @RequestBody String payload) {
    try {
      Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);

      switch (event.getType()) {
        case "payment_intent.succeeded" -> {
          // OPTIONAL: if you generated an order earlier and attached an orderId
          // to PaymentIntent metadata, you can mark it PAID here.
          var pi = (com.stripe.model.PaymentIntent) event.getDataObjectDeserializer()
                  .getObject().orElse(null);
          if (pi != null) {
            String orderId = pi.getMetadata().get("orderId"); // set this when you create the PI (optional)
            if (orderId != null && !orderId.isBlank()) {
              DocumentReference ref = db.collection("orders").document(orderId);
              ref.update("status", "PAID");
            }
          }
        }
        case "payment_intent.payment_failed" -> {
          // log / alert if needed
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
