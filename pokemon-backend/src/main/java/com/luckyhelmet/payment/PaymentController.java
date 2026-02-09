
// import com.luckyhelmet.order.dto.QuoteRequest;
// import com.luckyhelmet.order.dto.QuoteResponse;
// import com.luckyhelmet.order.OrderService;
// import com.stripe.Stripe;
// import com.stripe.model.PaymentIntent;
// import com.stripe.param.PaymentIntentCreateParams;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.web.bind.annotation.*;

// import java.util.HashMap;
// import java.util.Map;

// /**
//  * Creates Stripe PaymentIntents for the current cart total.
//  * We reuse your existing quote() so the server controls the amount.
//  */
// @RestController
// @RequestMapping("/api/payments")
// @CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
// public class PaymentController {

//   private final OrderService orderService;

//   public PaymentController(
//       OrderService orderService,
//       @Value("${stripe.secretKey}") String secretKey
//   ) {
//     this.orderService = orderService;
//     Stripe.apiKey = secretKey;
//   }

//   /** POST /api/payments/create-intent
//    * Body: { "items":[{"productId":"...", "quantity":1}, ...] }
//    * Returns: { clientSecret, paymentIntentId, total }
//    */
//   @PostMapping("/create-intent")
//   public Map<String, Object> createIntent(@RequestBody QuoteRequest req) throws Exception {
//     // 1) Quote on the server (subtotal/tax/shipping/total)
//     QuoteResponse quote = orderService.quote(req);
//     long amountInCents = Math.round(quote.total() * 100);

//     // 2) Create PaymentIntent
//     PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
//         .setAmount(amountInCents)
//         .setCurrency("usd")
//         .setAutomaticPaymentMethods(
//             PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
//               .setEnabled(true)
//               .build()
//         )
//         .build();

//     PaymentIntent pi = PaymentIntent.create(params);

//     // 3) Return clientSecret for the frontend Payment Element
//     Map<String, Object> out = new HashMap<>();
//     out.put("clientSecret", pi.getClientSecret());
//     out.put("paymentIntentId", pi.getId());
//     out.put("total", quote.total());
//     return out;
//   }
// }
package com.luckyhelmet.payment;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class PaymentController {

  // Use fully-qualified types to dodge import issues
  private final com.luckyhelmet.order.OrderService orderService;
  private final com.google.cloud.firestore.Firestore firestore;
  private final org.springframework.core.env.Environment environment;

  public PaymentController(
      com.luckyhelmet.order.OrderService orderService,
      com.google.cloud.firestore.Firestore firestore,
      org.springframework.core.env.Environment environment
  ) {
    this.orderService = orderService;
    this.firestore = firestore;
    this.environment = environment;
  }

  @javax.annotation.PostConstruct
  public void initStripeApiKey() {
    // Prefer resolved Spring property, fall back to raw env var if necessary
    String key = environment.getProperty("stripe.secretKey");
    if (key == null || key.isBlank()) {
      key = environment.getProperty("STRIPE_SECRET_KEY");
    }
    if (key != null && !key.isBlank()) {
      com.stripe.Stripe.apiKey = key;
    }
  }

  /**
   * POST /api/payments/create-intent
   * Body: CreateOrderRequest { cartId, email, items[], shippingAddress, billingAddress? }
   * Returns: { orderId, clientSecret, paymentIntentId, totalCents }
   */
  @PostMapping("/create-intent")
  public Map<String, Object> createIntent(
      @RequestBody com.luckyhelmet.order.dto.CreateOrderRequest req
  ) throws Exception {

    // 1) Reserve stock + create order (PENDING_PAYMENT) with idempotency(cartId)
    String orderId = orderService.create(req);

    // 2) Read server-authoritative total from order doc
    var snap = firestore.collection("orders").document(orderId).get().get();

    Object totalsObj = snap.get("totals");
    if (!(totalsObj instanceof Map)) {
      throw new IllegalStateException("order_totals_missing");
    }
    @SuppressWarnings("unchecked")
    Map<String, Object> totals = (Map<String, Object>) totalsObj;

    Object totalVal = totals.get("totalCents");
    if (!(totalVal instanceof Number)) {
      throw new IllegalStateException("order_total_invalid");
    }
    long totalCents = ((Number) totalVal).longValue();

    // 3) Create PaymentIntent (metadata ties back to order), idempotency by cartId
    com.stripe.param.PaymentIntentCreateParams params =
        com.stripe.param.PaymentIntentCreateParams.builder()
            .setAmount(totalCents)
            .setCurrency("usd")
            .putMetadata("orderId", orderId)
            .setAutomaticPaymentMethods(
                com.stripe.param.PaymentIntentCreateParams.AutomaticPaymentMethods
                    .builder().setEnabled(true).build()
            )
            .build();

    var options = com.stripe.net.RequestOptions.builder()
        .setIdempotencyKey("createIntent:" + req.getCartId())
        .build();

    com.stripe.model.PaymentIntent pi = com.stripe.model.PaymentIntent.create(params, options);

    // 4) Response for the client
    Map<String, Object> out = new HashMap<>();
    out.put("orderId", orderId);
    out.put("clientSecret", pi.getClientSecret());
    out.put("paymentIntentId", pi.getId());
    out.put("totalCents", totalCents);
    return out;
  }
}
