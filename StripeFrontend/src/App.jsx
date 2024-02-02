import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState({
    name: "Stripe",
    price: 10,
    productBy: "FB",
  });

  const makePayment = async (token) => {
    const body = {
      token,
      product,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch("http://localhost:8000/payments", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      console.log("i am called");
      console.log(response);

      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <StripeCheckout
        stripeKey={import.meta.env.VITE_APP_PUBLISHED_KEY}
        token={makePayment}
        amount={product.price * 100}
        name="Stripe Integration"
      />
    </div>
  );
}

export default App;
