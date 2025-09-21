package com.luckyhelmet.payment;

import com.luckyhelmet.order.dto.QuoteRequest;
import com.luckyhelmet.order.dto.QuoteResponse;
import com.luckyhelmet.order.OrderService;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Creates Stripe PaymentIntents for the current cart total.
 * We reuse your existing quote() so the server controls the amount.
 */
@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class PaymentController {

  private final OrderService orderService;

  public PaymentController(
      OrderService orderService,
      @Value("${stripe.secretKey}") String secretKey
  ) {
    this.orderService = orderService;
    Stripe.apiKey = secretKey;
  }

  /** POST /api/payments/create-intent
   * Body: { "items":[{"productId":"...", "quantity":1}, ...] }
   * Returns: { clientSecret, paymentIntentId, total }
   */
  @PostMapping("/create-intent")
  public Map<String, Object> createIntent(@RequestBody QuoteRequest req) throws Exception {
    // 1) Quote on the server (subtotal/tax/shipping/total)
    QuoteResponse quote = orderService.quote(req);
    long amountInCents = Math.round(quote.total() * 100);

    // 2) Create PaymentIntent
    PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
        .setAmount(amountInCents)
        .setCurrency("usd")
        .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
              .setEnabled(true)
              .build()
        )
        .build();

    PaymentIntent pi = PaymentIntent.create(params);

    // 3) Return clientSecret for the frontend Payment Element
    Map<String, Object> out = new HashMap<>();
    out.put("clientSecret", pi.getClientSecret());
    out.put("paymentIntentId", pi.getId());
    out.put("total", quote.total());
    return out;
  }
}
