import { useNavigate } from "react-router-dom";
import "../style/termscondition.css";
import { FaArrowLeft, FaFileContract, FaShieldAlt, FaUtensils, FaCreditCard, FaClock, FaGavel } from "react-icons/fa";

export default function TermsCondition() {
  const navigate = useNavigate();

  return (
    <div className="terms-page">
      {/* HEADER */}
      <div className="terms-header">
        <FaArrowLeft className="back-btn" onClick={() => navigate(-1)} />
        <h2>Terms & Conditions</h2>
        <FaFileContract className="header-icon" />
      </div>

      <div className="terms-container">
        <div className="terms-hero">
          <h1>Terms of Service</h1>
          <p>Last updated: March 10, 2025</p>
        </div>

        <div className="terms-content">

          <div className="terms-section">
            <div className="section-header">
              <FaShieldAlt className="icon" />
              <h3>1. Acceptance of Terms</h3>
            </div>
            <p>
              By using Campus Canteen, you agree to follow these Terms & Conditions. 
              If you don’t agree, please do not use our service.
            </p>
          </div>

          <div className="terms-section">
            <div className="section-header">
              <FaUtensils className="icon" />
              <h3>2. Ordering Rules</h3>
            </div>
            <ul>
              <li>Orders can be cancelled only within 2 minutes of placing.</li>
              <li>After preparation starts, cancellation is not allowed.</li>
              <li>We may cancel orders due to unavailability or high demand.</li>
              <li>Delivery time is estimated — not guaranteed.</li>
            </ul>
          </div>

          <div className="terms-section">
            <div className="section-header">
              <FaCreditCard className="icon" />
              <h3>3. Payments & Refunds</h3>
            </div>
            <ul>
              <li>All payments are secure and encrypted.</li>
              <li>Refunds only for cancelled orders or our mistake.</li>
              <li>Coupons can be used once per user unless stated otherwise.</li>
            </ul>
          </div>

          <div className="terms-section">
            <div className="section-header">
              <FaClock className="icon" />
              <h3>4. Operating Hours</h3>
            </div>
            <p>
              <strong>Monday – Friday:</strong> 8:00 AM – 9:00 PM<br />
              <strong>Saturday:</strong> 10:00 AM – 7:00 PM<br />
              <strong>Sunday:</strong> Closed
            </p>
          </div>

          <div className="terms-section">
            <div className="section-header">
              <FaGavel className="icon" />
              <h3>5. User Responsibility</h3>
            </div>
            <ul>
              <li>You must provide correct contact and delivery details.</li>
              <li>Fake orders or misuse will result in account block.</li>
              <li>Menu items and prices can change without notice.</li>
            </ul>
          </div>

          <div className="terms-section">
            <div className="section-header">
              <FaShieldAlt className="icon" />
              <h3>6. Liability</h3>
            </div>
            <p>
              Campus Canteen is not responsible for food allergies unless clearly mentioned during ordering. 
              We follow strict hygiene, but cross-contamination risk may exist.
            </p>
          </div>

          <div className="terms-footer">
            <p>Thank you for choosing Campus Canteen! 🍽️</p>
            <p>We’re here to make your campus life tastier and easier.</p>
          </div>

        </div>
      </div>
    </div>
  );
}