import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://zira-0fhn.onrender.com/api",
});

// Runs before every request — attaches the JWT if we have one.
// Real browser app, so localStorage is fine here (unlike the Claude artifact demo).
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("zira_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("zira_token");
      localStorage.removeItem("zira_user");
    }
    return Promise.reject(err);
  }
);

export const api = {
  login: (username, password) => client.post("/auth/login", { username, password }).then((r) => r.data),
  signup: (form) => client.post("/auth/signup", form).then((r) => r.data),
  me: () => client.get("/auth/me").then((r) => r.data),

  // Google OAuth — just returns the backend URL
  googleAuthUrl: () => `${client.defaults.baseURL}/auth/google`,

  updateProfile: (form) => client.put("/users/me", form).then((r) => r.data),
  listUsers: () => client.get("/users").then((r) => r.data),
  deleteUser: (id) => client.delete(`/users/${id}`).then((r) => r.data),

  listCategories: () => client.get("/categories").then((r) => r.data),
  createCategory: (data) => client.post("/categories", data).then((r) => r.data),
  updateCategory: (id, data) => client.put(`/categories/${id}`, data).then((r) => r.data),
  deleteCategory: (id) => client.delete(`/categories/${id}`).then((r) => r.data),

  listProducts: (params) => client.get("/products", { params }).then((r) => r.data),
  createProduct: (data) => client.post("/products", data).then((r) => r.data),
  updateProduct: (id, data) => client.put(`/products/${id}`, data).then((r) => r.data),
  deleteProduct: (id) => client.delete(`/products/${id}`).then((r) => r.data),

  listBlogs: () => client.get("/blogs").then((r) => r.data),
  createBlog: (data) => client.post("/blogs", data).then((r) => r.data),
  updateBlog: (id, data) => client.put(`/blogs/${id}`, data).then((r) => r.data),
  deleteBlog: (id) => client.delete(`/blogs/${id}`).then((r) => r.data),

  myOrders: () => client.get("/orders/mine").then((r) => r.data),
  allOrders: () => client.get("/orders").then((r) => r.data),
  checkout: (items) => client.post("/orders", { items }).then((r) => r.data),
  updateOrderStatus: (id, status) => client.put(`/orders/${id}/status`, { status }).then((r) => r.data),

  // Contact
  sendContact: (data) => client.post("/contacts", data).then((r) => r.data),
};

export default client;
