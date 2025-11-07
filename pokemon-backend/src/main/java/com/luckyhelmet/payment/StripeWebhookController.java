package com.luckyhelmet.payment;


import com.luckyhelmet.order.OrderService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import jakarta.servlet.http.HttpServletRequest;
import java.io.BufferedReader;


@RestController
@RequestMapping("/api/payments")
public class StripeWebhookController {
private final OrderService orders;
@Value("${stripe.webhookSecret}") private String webhookSecret;


public StripeWebhookController(OrderService orders){ this.orders = orders; }


@PostMapping("/webhook")
public ResponseEntity<String> handle(HttpServletRequest request, @RequestHeader("Stripe-Signature") String sigHeader) throws Exception {
StringBuilder sb = new StringBuilder();
try (BufferedReader reader = request.getReader()){
String line; while ((line = reader.readLine()) != null) sb.append(line);
}
String payload = sb.toString();


Event event;
try { event = Webhook.constructEvent(payload, sigHeader, webhookSecret); }
catch (SignatureVerificationException e){ return ResponseEntity.status(400).body("Bad signature"); }


if ("payment_intent.succeeded".equals(event.getType())){
var pi = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);
if (pi != null){
String orderId = pi.getMetadata().get("orderId");
if (orderId != null && !orderId.isBlank()) {
orders.markPaid(orderId, pi.getId());
}
}
}
return ResponseEntity.ok("ok");
}
}