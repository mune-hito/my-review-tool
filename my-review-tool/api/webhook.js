const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // イベントタイプに応じた処理
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // 支払い成功時の処理
            console.log('Payment succeeded:', paymentIntent.id);
            break;
        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            // 支払い失敗時の処理
            console.log('Payment failed:', failedPayment.id);
            break;
    }

    res.json({ received: true });
});

module.exports = router; 