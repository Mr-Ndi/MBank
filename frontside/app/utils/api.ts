export const API_URL = "http://localhost:5000/api/students"; // Change this to your backend URL

// Function for user signup
export const signup = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");

  return data; // Return token or user data
};

// Function for user login
export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");

  return data;
};

// Function for Google login
export const googleLogin = async () => {
  const res = await fetch(`${API_URL}/google-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Google login failed");

  return data;
};
