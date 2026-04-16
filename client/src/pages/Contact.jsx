import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/contact.css";
import {
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setSubmitted(false);
      }, 4000);
    }
  };

  return (
    <div className="contact-page">

      {/* HEADER */}
      <div className="contact-header">
        <FaArrowLeft className="back-btn" onClick={() => navigate(-1)} />
        <h2>Contact Us</h2>
      </div>

      <div className="contact-content">

        {/* HERO SECTION */}
        <div className="contact-hero">
          <h1>We'd Love to Hear From You!</h1>
          <p>Questions, feedback, or just saying hi? We're here 24/7.</p>
        </div>

        {/* CONTACT INFO CARDS */}
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon phone">
              <FaPhone />
            </div>
            <h3>Call Us</h3>
            <p>+91 98765 43210</p>
            <span className="info-time">Mon–Sat, 9AM–8PM</span>
          </div>

          <div className="info-card">
            <div className="info-icon email">
              <FaEnvelope />
            </div>
            <h3>Email Us</h3>
            <p>support@campuscanteen.edu</p>
            <span className="info-time">Reply within 24 hours</span>
          </div>

          <div className="info-card">
            <div className="info-icon location">
              <FaMapMarkerAlt />
            </div>
            <h3>Visit Us</h3>
            <p>Student Union Building<br />Ground Floor, Campus University</p>
            <span className="info-time"><FaClock /> Open now</span>
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="social-links">
          <h3>Connect With Us</h3>
          <div className="social-buttons">
            <a href="https://instagram.com" target="_blank" className="social-btn instagram">
              <FaInstagram /> Instagram
            </a>
            <a href="https://facebook.com" target="_blank" className="social-btn facebook">
              <FaFacebook /> Facebook
            </a>
            <a href="https://wa.me/919876543210" target="_blank" className="social-btn whatsapp">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          {submitted ? (
            <div className="success-message">
              <FaCheckCircle className="success-icon" />
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully.<br />We’ll get back to you soon!</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <textarea
                name="message"
                rows="6"
                placeholder="Your Message..."
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button type="submit" className="submit-btn">
                <FaPaperPlane /> Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}