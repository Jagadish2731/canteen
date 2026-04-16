import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/cart.css";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaTag,
  FaBookmark,
} from "react-icons/fa";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const COUPONS = { SAVE10: 10, CANTEEN20: 20, FIRST50: 50 };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const savedData = JSON.parse(localStorage.getItem("savedForLater")) || [];
    setCart(cartData);
    setSavedForLater(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("savedForLater", JSON.stringify(savedForLater));
  }, [savedForLater]);

  const handleIncrease = (id) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  };

  const handleDecrease = (id) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item.qty === 1) return prev;
      return prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i));
    });
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSaveForLater = (itemToSave) => {
    setCart((prev) => prev.filter((item) => item.id !== itemToSave.id));
    setSavedForLater((prev) => {
      if (prev.find((item) => item.id === itemToSave.id)) return prev;
      return [...prev, { ...itemToSave, qty: 1 }];
    });
  };

  const handleAddToCartFromSaved = (itemToAdd) => {
    setSavedForLater((prev) => prev.filter((item) => item.id !== itemToAdd.id));
    setCart((prev) => {
      const exist = prev.find((item) => item.id === itemToAdd.id);
      if (exist) {
        return prev.map((item) =>
          item.id === itemToAdd.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...itemToAdd, qty: 1 }];
      }
    });
  };

  const applyCoupon = () => {
    if (couponApplied) return;
    const disc = COUPONS[coupon.toUpperCase()];
    if (disc) {
      setDiscount(disc);
      setCouponApplied(true);
      setCouponMsg(`✅ Coupon applied! ₹${disc} off`);
    } else {
      setDiscount(0);
      setCouponMsg("❌ Invalid coupon code");
    }
  };

  const subtotal = cart.reduce((t, i) => t + i.price * i.qty, 0);
  const deliveryCharge = subtotal > 0 ? 20 : 0;
  const total = subtotal + deliveryCharge - discount;

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <FaArrowLeft className="cart-back-btn" onClick={() => navigate("/")} />
          <h2>My Cart</h2>
          <div className="cart-header-right" />
        </div>
        <div className="cart-empty">
          <FaShoppingCart className="empty-cart-icon" />
          <h3>Your Cart is Empty!</h3>
          <p>Add some delicious food items 🍔</p>
          <button className="cart-browse-btn" onClick={() => navigate("/")}>Browse Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <FaArrowLeft className="cart-back-btn" onClick={() => navigate("/")} />
        <h2>My Cart ({cart.reduce((t, i) => t + i.qty, 0)})</h2>
        <div className="cart-header-right" />
      </div>

      <div className="cart-layout">
        
        {/* ✅ CHANGED: Right Column for Items (now first in code) */}
        <div className="cart-items-column">
          {cart.length > 0 && (
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-card" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">₹{item.price} each</p>
                    <div className="cart-qty-controls">
                      <button className="cart-qty-btn" onClick={() => handleDecrease(item.id)}><FaMinus /></button>
                      <span className="cart-qty-count">{item.qty}</span>
                      <button className="cart-qty-btn" onClick={() => handleIncrease(item.id)}><FaPlus /></button>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <span className="cart-item-total">₹{item.price * item.qty}</span>
                    <div className="cart-item-actions">
                      <FaBookmark className="cart-save-btn" onClick={() => handleSaveForLater(item)} title="Save for later"/>
                      <FaTrash className="cart-delete-btn" onClick={() => handleRemove(item.id)} title="Remove item"/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {savedForLater.length > 0 && (
            <div className="saved-for-later-section">
              <h3 className="saved-title">Saved for Later ({savedForLater.length})</h3>
              <div className="saved-grid">
                {savedForLater.map((item) => (
                  <div className="saved-card" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                    <button onClick={() => handleAddToCartFromSaved(item)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ✅ CHANGED: Left Column for Summary (now second in code) */}
        <div className="cart-summary-column">
          {cart.length > 0 && (
            <>
              <div className="summary-card coupon-section">
                <div className="summary-title"><FaTag /><span>Apply Coupon</span></div>
                <div className="coupon-input-row">
                  <input type="text" placeholder="Enter coupon code..." value={coupon} onChange={(e) => setCoupon(e.target.value)} className="coupon-input" disabled={couponApplied}/>
                  <button className="coupon-apply-btn" onClick={applyCoupon} disabled={couponApplied}>{couponApplied ? "Applied ✓" : "Apply"}</button>
                </div>
                {couponMsg && <p className={`coupon-msg ${couponApplied ? "success" : "error"}`}>{couponMsg}</p>}
              </div>

              <div className="summary-card bill-summary">
                <h3 className="summary-title">Bill Summary</h3>
                <div className="bill-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="bill-row"><span>Delivery Charge</span><span>₹{deliveryCharge}</span></div>
                {discount > 0 && <div className="bill-row discount-row"><span>Discount</span><span>- ₹{discount}</span></div>}
                <div className="bill-divider" />
                <div className="bill-row total-row"><span>Total</span><span>₹{total}</span></div>
              </div>

              <button className="proceed-btn" onClick={() => navigate("/payment", { state: { total: total, cart: cart } })}>
                Proceed to Payment • ₹{total}
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}