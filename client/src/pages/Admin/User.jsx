import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiSearch, FiStar, FiShoppingBag } from "react-icons/fi";
import "../../style/AdminCSS/user.css";
 
const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
 
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+91 9876543210",
      location: "Mumbai",
      totalOrders: 15,
      totalSpent: 2250,
      status: "active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+91 9876543211",
      location: "Delhi",
      totalOrders: 8,
      totalSpent: 1200,
      status: "active"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@email.com",
      phone: "+91 9876543212",
      location: "Bangalore",
      totalOrders: 22,
      totalSpent: 3300,
      status: "active"
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@email.com",
      phone: "+91 9876543213",
      location: "Chennai",
      totalOrders: 5,
      totalSpent: 750,
      status: "inactive"
    }
  ];
 
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  return (
    <div className="users-page">
      <div className="users-header">
        <h1>👥 Customer Management</h1>
        <p>Manage your canteen customers and their information</p>
      </div>
 
      {/* Search only — no Filter button */}
      <div className="users-controls">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
 
      <div className="users-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FiUser />
          </div>
          <div className="stat-info">
            <h3>{customers.length}</h3>
            <p>Total Customers</p>
          </div>
        </div>
 
        <div className="stat-card">
          <div className="stat-icon active">
            <FiUser />
          </div>
          <div className="stat-info">
            <h3>{customers.filter(c => c.status === "active").length}</h3>
            <p>Active Customers</p>
          </div>
        </div>
 
        <div className="stat-card">
          <div className="stat-icon orders">
            <FiShoppingBag />
          </div>
          <div className="stat-info">
            <h3>{Math.round(customers.reduce((sum, c) => sum + c.totalOrders, 0) / customers.length)}</h3>
            <p>Avg Orders/Customer</p>
          </div>
        </div>
 
        <div className="stat-card">
          <div className="stat-icon revenue">
            <FiMail />
          </div>
          <div className="stat-info">
            <h3>₹{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>
 
      <div className="customers-grid">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="customer-card">
            <div className="customer-header">
              <div className="customer-avatar">
                <FiUser />
              </div>
              <div className="customer-basic">
                <h3>{customer.name}</h3>
                <span className={`status-badge ${customer.status}`}>
                  {customer.status}
                </span>
              </div>
            </div>
 
            <div className="customer-details">
              <div className="detail-item">
                <FiMail className="detail-icon" />
                <span>{customer.email}</span>
              </div>
              <div className="detail-item">
                <FiPhone className="detail-icon" />
                <span>{customer.phone}</span>
              </div>
              <div className="detail-item">
                <FiMapPin className="detail-icon" />
                <span>{customer.location}</span>
              </div>
            </div>
 
            {/* Only Total Orders and Total Spent — no Member Since */}
            <div className="customer-stats">
              <div className="stat-item">
                <span className="stat-label">Total Orders</span>
                <span className="stat-value">{customer.totalOrders}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Spent</span>
                <span className="stat-value">₹{customer.totalSpent.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Users;