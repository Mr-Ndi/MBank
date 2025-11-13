import api from "./axiosInstance";

interface LoginResponse {
  status: string;
  message?: string;
  data?: any;
  token?: string;
}

export const signup = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post("/auth/register", { firstName, lastName, username, email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post("/auth/login", { email, password });

    const respData = response.data as LoginResponse;

    // The backend sometimes nests the token inside `data` (or inside an array).
    // Normalize by searching common locations so client code can rely on `respData.token`.
    const findToken = (obj: any): string | undefined => {
      if (!obj || typeof obj !== "object") return undefined;
      if (typeof obj.token === "string") return obj.token;
      for (const k of Object.keys(obj)) {
        const v = obj[k];
        if (v && typeof v === "object") {
          const t = findToken(v);
          if (t) return t;
        }
      }
      return undefined;
    };

    const token = respData.token ?? findToken(respData.data) ?? findToken(respData as any);

    if (!token) {
      throw new Error("No token received from the server.");
    }

    // ensure token is available at the top-level for callers
    (respData as any).token = token;

    // return full response data (status, message, data, token)
    return respData;
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


export const uploadCopy = async (
  file: File,
  metadata: {
    school: string;
    moduleCode?: string;
    department: string;
    level: number | string;
    moduleName: string;
    date?: string;
    category: string;
  },
  onProgress?: (percent: number) => void
) => {
  try {
    const form = new FormData();
    form.append("file", file as any);
    form.append("school", metadata.school);
    form.append("moduleCode", metadata.moduleCode ?? metadata.moduleName);
    form.append("department", metadata.department);
    form.append("level", String(metadata.level));
    form.append("moduleName", metadata.moduleName);
    form.append("date", metadata.date ?? new Date().toISOString());
    form.append("category", metadata.category);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers: any = { "Content-Type": "multipart/form-data" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await api.post("/document/upload", form, {
      headers,
      onUploadProgress: (progressEvent: any) => {
        if (!progressEvent || !progressEvent.total) return;
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress?.(percentCompleted);
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Upload failed");
  }
};

export const getDocuments = async () => {
  try {
    const response = await api.get("/document");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Failed to fetch documents");
  }
};
