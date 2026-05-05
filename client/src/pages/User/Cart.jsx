import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/UserCSS/cart.css";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaTag,
  FaBookmark,
  FaReceipt,
} from "react-icons/fa";

const COUPONS = { SAVE10: 10, CANTEEN20: 20, FIRST50: 50 };

const fallbackImage = (e) => {
  e.target.src = "https://via.placeholder.com/100x100.png?text=Food";
};

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart]                   = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  const [coupon, setCoupon]               = useState("");
  const [discount, setDiscount]           = useState(0);
  const [couponMsg, setCouponMsg]         = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setSavedForLater(JSON.parse(localStorage.getItem("savedForLater")) || []);
  }, []);

  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("savedForLater", JSON.stringify(savedForLater)); }, [savedForLater]);

  const increase = (id) =>
    setCart((p) => p.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));

  const decrease = (id) =>
    setCart((p) =>
      p.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0)
    );

  const remove = (id) => setCart((p) => p.filter((i) => i.id !== id));

  const saveForLater = (item) => {
    remove(item.id);
    setSavedForLater((p) => (p.find((i) => i.id === item.id) ? p : [...p, item]));
  };

  const moveToCart = (item) => {
    setSavedForLater((p) => p.filter((i) => i.id !== item.id));
    setCart((p) => {
      const exists = p.find((i) => i.id === item.id);
      return exists
        ? p.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...p, { ...item, qty: 1 }];
    });
  };

  const applyCoupon = () => {
    if (couponApplied) return;
    const value = COUPONS[coupon.toUpperCase()];
    if (value) {
      setDiscount(value);
      setCouponApplied(true);
      setCouponMsg(`✅ Coupon applied! You saved ₹${value}`);
    } else {
      setDiscount(0);
      setCouponMsg("❌ Invalid coupon code");
    }
  };

  const subtotal  = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const delivery  = subtotal > 0 ? 20 : 0;
  const total     = Math.max(0, subtotal + delivery - discount);
  const itemCount = cart.reduce((a, i) => a + i.qty, 0);

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="cart-page">
        <header className="cart-header">
          <button className="cart-back-btn" onClick={() => navigate("/home")}>
            <FaArrowLeft />
          </button>
          <h2>My Cart</h2>
          <div className="cart-header-right" />
        </header>
        <div className="cart-empty">
          <FaShoppingCart className="empty-cart-icon" />
          <h3>Your Cart is Empty</h3>
          <p>Add something delicious 🍔</p>
          <button className="cart-browse-btn" onClick={() => navigate("/home")}>
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="cart-header">
        <button className="cart-back-btn" onClick={() => navigate("/home")}>
          <FaArrowLeft />
        </button>
        <h2>My Cart ({itemCount})</h2>
        <div className="cart-header-right" />
      </header>

      <div className="cart-layout">

        {/* LEFT: Items + Saved */}
        <div className="cart-items-column">

          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-card">
                <img src={item.image} onError={fallbackImage} alt={item.name} />

                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">₹{item.price} each</p>
                  <div className="cart-qty-controls">
                    <button className="cart-qty-btn" onClick={() => decrease(item.id)}>
                      <FaMinus />
                    </button>
                    <span className="cart-qty-count">{item.qty}</span>
                    <button className="cart-qty-btn" onClick={() => increase(item.id)}>
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <span className="cart-item-total">₹{item.price * item.qty}</span>
                  <button
                    className="cart-action-btn delete"
                    title="Remove"
                    onClick={() => remove(item.id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="cart-action-btn save"
                    title="Save for later"
                    onClick={() => saveForLater(item)}
                  >
                    <FaBookmark />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {savedForLater.length > 0 && (
            <div className="saved-section">
              <h3>Saved for Later ({savedForLater.length})</h3>
              <div className="saved-grid">
                {savedForLater.map((item) => (
                  <div key={item.id} className="saved-card">
                    <img src={item.image} onError={fallbackImage} alt={item.name} />
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                    <button onClick={() => moveToCart(item)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Summary */}
        <div className="cart-summary-column">

          <div className="summary-card">
            <h3><FaTag /> Apply Coupon</h3>
            <div className="coupon-input-row">
              <input
                className="coupon-input"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                disabled={couponApplied}
              />
              <button
                className="coupon-apply-btn"
                onClick={applyCoupon}
                disabled={couponApplied || !coupon}
              >
                Apply
              </button>
            </div>
            {couponMsg && (
              <p className={`coupon-msg ${couponApplied ? "success" : "error"}`}>
                {couponMsg}
              </p>
            )}
            {!couponApplied && (
              <div className="coupon-hints">
                {Object.keys(COUPONS).map((code) => (
                  <span key={code} onClick={() => setCoupon(code)}>{code}</span>
                ))}
              </div>
            )}
          </div>

          <div className="bill-summary">
            <h3><FaReceipt /> Bill Summary</h3>
            <div className="bill-row">
              <span>Subtotal ({itemCount} items)</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="bill-row">
              <span>Delivery Fee</span>
              <span>₹{delivery}</span>
            </div>
            {discount > 0 && (
              <div className="bill-row discount-row">
                <span>Coupon Discount</span>
                <span>- ₹{discount}</span>
              </div>
            )}
            <hr className="bill-divider" />
            <div className="total-row">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            className="proceed-btn"
            onClick={() => navigate("/payment", { state: { cart, total } })}
          >
            Proceed to Pay ₹{total}
          </button>
        </div>
      </div>
    </div>
  );
}
