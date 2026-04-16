import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../style/payment.css";
import {
  FaArrowLeft,
  FaCreditCard,
  FaWarehouse,
  FaQrcode,
  FaCheckCircle,
  FaCopy,
  FaDownload,
} from "react-icons/fa";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { total, cart } = location.state || { total: 0, cart: [] };
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const upiId = "campuscanteen@upi";
  const qrImage = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=campuscanteen@upi&pn=Campus%20Canteen&am=" + total + "&cu=INR";

  const handlePayNow = () => {
    if (processing) return;
    setProcessing(true);

    setTimeout(() => {
      const newOrder = {
        id: `ORD${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Preparing",
        items: cart.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
        total: total,
      };

      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));
      localStorage.setItem("cart", JSON.stringify([]));

      setProcessing(false);
      setOrderPlaced(true);
    }, 2500);
  };

  if (orderPlaced) {
    return (
      <div className="payment-page">
        <div className="order-success">
          <div className="success-icon"><FaCheckCircle /></div>
          <h2>Payment Successful!</h2>
          <p>Your order is being prepared 🍽️</p>
          <div className="success-btns">
            <button className="track-btn" onClick={() => navigate("/orders")}>Track Order</button>
            <button className="home-btn" onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-header">
        <FaArrowLeft className="payment-back-btn" onClick={() => navigate("/cart")} />
        <h2>Payment</h2>
        <div className="header-total">₹{total}</div>
      </div>

      <div className="payment-content">

        {/* ORDER SUMMARY */}
        <div className="payment-card summary-card">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items ({cart.reduce((t, i) => t + i.qty, 0)})</span>
            <span>₹{total}</span>
          </div>
          <div className="summary-row">
            <span>Payable Amount</span>
            <span className="payable-amount">₹{total}</span>
          </div>
        </div>

        {/* PAYMENT METHODS */}
        <div className="payment-card methods-card">
          <h3>Select Payment Method</h3>

          <div
            className={`method-option ${paymentMethod === "UPI" ? "active" : ""}`}
            onClick={() => setPaymentMethod("UPI")}
          >
            <FaQrcode className="method-icon" />
            <span>UPI / QR Code</span>
            <div className="radio-check" />
          </div>

          <div
            className={`method-option ${paymentMethod === "CARD" ? "active" : ""}`}
            onClick={() => setPaymentMethod("CARD")}
          >
            <FaCreditCard className="method-icon" />
            <span>Credit / Debit Card</span>
            <div className="radio-check" />
          </div>

          <div
            className={`method-option ${paymentMethod === "COD" ? "active" : ""}`}
            onClick={() => setPaymentMethod("COD")}
          >
            <FaWarehouse className="method-icon" />
            <span>Cash on Delivery</span>
            <div className="radio-check" />
          </div>

          {/* UPI QR CODE SECTION */}
          {paymentMethod === "UPI" && (
            <div className="upi-qr-section">
              <div className="qr-container">
                <img src={qrImage} alt="UPI QR Code" className="qr-code" />
              </div>
              <div className="upi-details">
                <p><strong>UPI ID:</strong> <span className="upi-id">{upiId}</span></p>
                <p><strong>Amount:</strong> ₹{total}</p>
                <div className="upi-actions">
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText(upiId)}>
                    <FaCopy /> Copy UPI ID
                  </button>
                  <a href={qrImage} download="CampusCanteen-QR.png" className="download-btn">
                    <FaDownload /> Download QR
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* CARD FORM */}
          {paymentMethod === "CARD" && (
            <div className="card-form">
              <input type="text" placeholder="Card Number" maxLength="19" />
              <div className="card-form-row">
                <input type="text" placeholder="MM / YY" maxLength="5" />
                <input type="text" placeholder="CVV" maxLength="3" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PAY NOW BUTTON */}
      <div className="pay-footer">
        <button className="pay-now-btn" onClick={handlePayNow} disabled={processing}>
          {processing ? "Processing Payment..." : `Pay ₹${total}`}
        </button>
      </div>
    </div>
  );
}