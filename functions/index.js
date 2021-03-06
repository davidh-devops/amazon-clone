const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const stripe = require('stripe')(
  'sk_test_51HPxnuBW47SN0WxeGHdrcSjUCqLr0Avzc0boTPfjkldZwMsKmkHbparCOudW9muxYsOMPeU4gnx263aKCGB3YTIR00e9zV9KwR'
);

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(helmet());

app.get('/', (req, res) => {
  res.status(200).send('hello word');
});

app.post('/payments/create', async (req, res) => {
  const total = req.query.total;
  console.log(`payment request recieved for ${total} cents`);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// const port = process.env.PORT || 9000;
// app.listen(port, () => console.log(`server is running on port: ${port}`));
exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
