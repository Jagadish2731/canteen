// src/services/api.js

const API_BASE = "http://localhost:5000/api";

/* ===============================
   Local Fallback Mock Data
================================= */
const localDashboardMock = {
  stats: {
    totalRevenue: 48290,
    revenueGrowth: 12.4,
    totalOrders: 1284,
    orderGrowth: 8.7,
    totalCustomers: 3942,
    customerGrowth: 3.1,
    refundRate: 1.2,
    refundDrop: 0.9,
  },
  sales: [52, 68, 44, 80, 71, 60, 92],
  traffic: [
    { label: "Organic Search", value: 42, color: "#4f46e5" },
    { label: "Direct", value: 26, color: "#8b5cf6" },
    { label: "Social", value: 18, color: "#06b6d4" },
    { label: "Referral", value: 14, color: "#cbd5e1" },
  ],
  orders: [
    {
      orderId: "#ORD-1298",
      customer: "Aisha Khan",
      status: "Completed",
      amount: 48.0,
    },
    {
      orderId: "#ORD-1297",
      customer: "Rohan Mehta",
      status: "Pending",
      amount: 22.5,
    },
    {
      orderId: "#ORD-1296",
      customer: "Sana Ali",
      status: "Processing",
      amount: 74.2,
    },
    {
      orderId: "#ORD-1295",
      customer: "David Cruz",
      status: "Completed",
      amount: 36.9,
    },
  ],
  activity: [
    { message: "New order from Aisha Khan", time: "2 min ago" },
    { message: "Payment received for #ORD-1296", time: "16 min ago" },
    { message: "Inventory alert: Pasta below threshold", time: "43 min ago" },
    { message: "New review posted by user #128", time: "1 hour ago" },
  ],
};

/* ===============================
   Helper: Parse API Response
================================= */
async function parseResponse(response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

/* ===============================
   Reusable API Helper
================================= */
export async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const data = await parseResponse(response);

    if (!response.ok) {
      const message =
        data?.message || data?.error || `API Error: ${response.status}`;

      throw new Error(message);
    }

    return data;
  } catch (error) {
    console.error("API Request failed:", error.message);
    throw error;
  }
}

/* ===============================
   Auth API
================================= */
export async function loginUser(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function registerUser(userData) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

/* ===============================
   Dashboard API
================================= */
export async function getDashboardData() {
  try {
    return await apiRequest("/admin/dashboard");
  } catch (error) {
    console.warn("Using local dashboard mock data:", error.message);
    return localDashboardMock;
  }
}

/* ===============================
   Optional Default Export
================================= */
export default {
  loginUser,
  registerUser,
  getDashboardData,
  apiRequest,
};