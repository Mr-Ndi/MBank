import api from "./axiosInstance";

interface LoginResponse {
  token: string;
}

export const signup = async ( regnumber: number, email: string, password: string, username: string, school: string, department: string) => {
  try {
    const response = await api.post("/students/signup", { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post("/student/login", { email, password });

    if (!response.data?.token) {
      throw new Error("No token received from the server.");
    }

    return response.data.token;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed. Please try again.");
  }
};

export const googleLogin = async () => {
  try {
    const response = await api.post("/api/students/google-login");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Google login failed");
  }
};
