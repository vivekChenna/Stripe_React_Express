const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.SECRET_KEY);
const { v4: uuidv4 } = require("uuid");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello this is the home page");
});

app.post("/payments", (req, res) => {
  const { token, product } = req.body;
  console.log("product details");
  console.log(product);
  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Your Purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,  
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`server running successfully at ${PORT}`);
});
