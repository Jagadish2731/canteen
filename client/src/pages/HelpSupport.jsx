import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/helpsupport.css";
import {
  FaArrowLeft,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaPhone,
  FaEnvelope,
  FaShoppingBag,
  FaCreditCard,
  FaUtensils,
  FaUserCircle,
  FaBug,
} from "react-icons/fa";

const faqs = [
  { id: 1, question: "How do I place an order?", answer: "Browse the menu on the home page, select your items by clicking ADD, then go to your cart and click 'Proceed to Payment' to complete your order.", icon: <FaUtensils /> },
  { id: 2, question: "How do I track my order?", answer: "Go to 'My Orders' from the header or sidebar. You can see the real-time status of your order — Preparing, Out for Delivery, or Delivered.", icon: <FaShoppingBag /> },
  { id: 3, question: "What payment methods are accepted?", answer: "We accept UPI, Credit/Debit Cards, and Cash on Delivery (COD). All online payments are secured and encrypted.", icon: <FaCreditCard /> },
  { id: 4, question: "Can I cancel my order?", answer: "Orders can be cancelled within 2 minutes of placing them. Once the canteen starts preparing your food, cancellation is not possible.", icon: <FaShoppingBag /> },
  { id: 5, question: "How do I update my profile?", answer: "Go to your Profile page by clicking the profile icon in the header. Click the edit icon at the top right to update your details.", icon: <FaUserCircle /> },
  { id: 6, question: "How do I apply a coupon code?", answer: "On the Cart page, you will find a coupon section. Enter your code and click Apply. Valid codes: SAVE10, CANTEEN20, FIRST50.", icon: <FaCreditCard /> },
  { id: 7, question: "What if I received a wrong order?", answer: "We apologize for the inconvenience. Please contact our support team immediately via phone or email with your order ID and we will resolve it quickly.", icon: <FaBug /> },
  { id: 8, question: "How do I save items for later?", answer: "On the Cart page, click the bookmark icon on any item to save it for later. You can add it back to cart anytime from the 'Saved for Later' section.", icon: <FaShoppingBag /> },
];

export default function HelpSupport() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmitted(true);
      setMessage("");
    }
  };

  return (
    <div className="help-page">
      {/* HEADER */}
      <div className="help-header">
        <FaArrowLeft className="help-back-btn" onClick={() => navigate(-1)} title="Go Back" />
        <h2>Help & Support</h2>
        <FaQuestionCircle className="help-header-icon" />
      </div>

      <div className="help-content">

        {/* HERO BANNER */}
        <div className="help-hero">
          <h2>How can we help you?</h2>
          <p>Find answers to common questions or get in touch with our support team.</p>
        </div>

        {/* QUICK CATEGORIES */}
        <div className="help-section">
          <h3 className="section-heading">Browse by Topic</h3>
          <div className="categories-grid">
            {[
              { label: "Orders", icon: <FaShoppingBag /> },
              { label: "Payments", icon: <FaCreditCard /> },
              { label: "Account", icon: <FaUserCircle /> },
              { label: "Food", icon: <FaUtensils /> },
            ].map((cat, i) => (
              <div key={i} className="category-card">
                <span className="category-icon">{cat.icon}</span>
                <span className="category-label">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="help-section">
          <h3 className="section-heading">Frequently Asked Questions</h3>
          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq.id} className={`faq-item ${openFaq === faq.id ? "open" : ""}`}>
                <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                  <div className="faq-question-left">
                    <span className="faq-icon">{faq.icon}</span>
                    <span>{faq.question}</span>
                  </div>
                  <span className="faq-chevron">
                    {openFaq === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>
                {openFaq === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="help-section">
          <h3 className="section-heading">Contact Us</h3>
          <div className="contact-cards">
            <div className="contact-card">
              <FaPhone className="contact-card-icon" />
              <h4>Call Us</h4>
              <p>+91 98765 43210</p>
              <span>Mon–Fri, 9AM–6PM</span>
            </div>
            <div className="contact-card">
              <FaEnvelope className="contact-card-icon" />
              <h4>Email Us</h4>
              <p>support@campuscanteen.edu</p>
              <span>Reply within 24 hours</span>
            </div>
          </div>
        </div>

        {/* SEND A MESSAGE */}
        <div className="help-section">
          <h3 className="section-heading">Send Us a Message</h3>
          {submitted ? (
            <div className="success-msg">
              <span>Message Sent!</span>
              <div>
                <h4>Thank you!</h4>
                <p>We'll get back to you within 24 hours.</p>
              </div>
              <button onClick={() => setSubmitted(false)}>Send Another</button>
            </div>
          ) : (
            <form className="message-form" onSubmit={handleSubmit}>
              <select className="form-select" required>
                <option value="">Select Issue Type</option>
                <option value="order">Order Issue</option>
                <option value="payment">Payment Issue</option>
                <option value="account">Account Issue</option>
                <option value="food">Food Quality</option>
                <option value="other">Other</option>
              </select>
              <textarea
                className="form-textarea"
                placeholder="Describe your issue in detail..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button type="submit" className="form-submit-btn">
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}