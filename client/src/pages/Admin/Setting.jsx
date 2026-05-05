import { useState } from "react";
import { FiBell, FiCheckSquare, FiMail, FiUser } from "react-icons/fi";
import "../../style/AdminCSS/setting.css";

const Settings = () => {
  const [notifications, setNotifications] = useState(false);
  const [autoAccept, setAutoAccept] = useState(false);

  return (
    <div className="settings-page">

      {/* ── Header (mirrors .menu-header) ── */}
      <div className="settings-header">
        <h1>⚙️ Settings</h1>
        <p>Manage your admin profile and panel preferences.</p>
      </div>

      <div className="settings-body">

        {/* ── Profile Section ── */}
        <div className="settings-section">
          <div className="settings-section-title">
            <div className="section-icon"><FiUser /></div>
            <h2>Profile Settings</h2>
          </div>

          <div className="settings-row">
            <div className="settings-group">
              <label>Admin Name</label>
              <input type="text" placeholder="Enter admin name" />
            </div>
            <div className="settings-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email address" />
            </div>
          </div>

          <div className="settings-group">
            <label>About</label>
            <textarea placeholder="Write something about admin or canteen..." />
          </div>
        </div>

        {/* ── Preferences Section ── */}
        <div className="settings-section">
          <div className="settings-section-title">
            <div className="section-icon purple-icon"><FiBell /></div>
            <h2>Preferences</h2>
          </div>

          <div className="settings-switch-row">
            <div className="settings-switch-info">
              <h4><FiMail className="switch-icon" /> Email Notifications</h4>
              <p>Receive alerts for new orders and updates.</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications((v) => !v)}
              />
              <span className="toggle-track">
                <span className="toggle-thumb" />
              </span>
            </label>
          </div>

          <div className="settings-switch-row">
            <div className="settings-switch-info">
              <h4><FiCheckSquare className="switch-icon" /> Auto Accept Orders</h4>
              <p>Automatically accept incoming orders.</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={autoAccept}
                onChange={() => setAutoAccept((v) => !v)}
              />
              <span className="toggle-track">
                <span className="toggle-thumb" />
              </span>
            </label>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="settings-actions">
          <button className="btn btn-secondary" type="button">Cancel</button>
          <button className="btn btn-primary" type="button">Save Changes</button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
