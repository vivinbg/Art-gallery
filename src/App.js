import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";

const artworks = [
  {
    id: 1,
    title: "Starry Night",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    price: 2000000,
  },
  {
    id: 2,
    title: "The Scream",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
    price: 1500000,
  },
  {
    id: 3,
    title: "Mona Lisa",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
    price: 5000000,
  },
  {
    id: 4,
    title: "Girl with a Pearl Earring",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg",
    price: 3000000,
  },
  {
    id: 5,
    title: "The Kiss",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7a/Gustav_Klimt_016.jpg",
    price: 2200000,
  },
  {
    id: 6,
    title: "The Birth of Venus",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    price: 3500000,
  },
];

function Home({ addToCart }) {
  return (
    <div className="app">
      <h1 className="title">🎨 Art Gallery</h1>
      <Link to="/cart" className="cart-link">
        🛒 View Cart
      </Link>
      <div className="gallery">
        {artworks.map((art) => (
          <div className="card" key={art.id}>
            <img src={art.image} alt={art.title} />
            <h2>{art.title}</h2>
            <p className="price">${art.price.toLocaleString()}</p>
            <button className="buy-btn" onClick={() => addToCart(art)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, art) => sum + art.price, 0);

  return (
    <div className="app">
      <h1 className="title">🛒 Your Cart</h1>
      <Link to="/" className="cart-link">
        ← Back to Gallery
      </Link>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="gallery">
          {cart.map((art, index) => (
            <div className="card" key={index}>
              <img src={art.image} alt={art.title} />
              <h2>{art.title}</h2>
              <p className="price">${art.price.toLocaleString()}</p>
              <button className="remove-btn" onClick={() => removeFromCart(art.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <>
          <h2 className="total">Total: ${total.toLocaleString()}</h2>
          <button className="buy-btn" onClick={() => navigate("/buy")}>
            Proceed to Buy
          </button>
        </>
      )}
    </div>
  );
}

function Buy({ cart }) {
  const navigate = useNavigate();
  const [payment, setPayment] = useState("");
  const total = cart.reduce((sum, art) => sum + art.price, 0);

  const handleBuy = () => {
    if (payment) {
      navigate("/thankyou");
    } else {
      alert("Please select a payment method!");
    }
  };

  return (
    <div className="app">
      <h1 className="title">💳 Payment</h1>
      <Link to="/cart" className="cart-link">
        ← Back to Cart
      </Link>

      <h2>Total Amount: ${total.toLocaleString()}</h2>

      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="payment"
            value="GPay"
            onChange={(e) => setPayment(e.target.value)}
          />
          GPay / UPI
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="Card"
            onChange={(e) => setPayment(e.target.value)}
          />
          Credit / Debit Card
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="COD"
            onChange={(e) => setPayment(e.target.value)}
          />
          Cash on Delivery
        </label>
      </div>

      <button className="buy-btn" onClick={handleBuy}>
        Confirm Order
      </button>
    </div>
  );
}

function ThankYou() {
  return (
    <div className="app">
      <h1 className="title">🎉 Thank You for Your Order!</h1>
      <p>Your beautiful art pieces will be delivered soon. 🖼️</p>
      <Link to="/" className="cart-link">
        Back to Home
      </Link>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (art) => {
    setCart([...cart, art]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((art) => art.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} removeFromCart={removeFromCart} />}
        />
        <Route path="/buy" element={<Buy cart={cart} />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;

