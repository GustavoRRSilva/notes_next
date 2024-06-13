import { api, requestConfig } from "../utils/config";
import { useUser } from "@/contexts/userContext";

// Register a user
const register = async (data) => {
  const config = requestConfig("POST", " ", data);

  try {
    const res = await fetch(api + "/users/register", config);
    const result = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(result));
      return result;
    } else {
      return { errors: [result.errors || "Erro desconhecido"] };
    }
  } catch (error) {
    console.error("Erro no registro:", error);
    return { errors: [result.errors || "Erro desconhecido"] };
  }
};

// Logout a user
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in a user
const login = async (data) => {
  const config = requestConfig("POST", " ", data);

  try {
    const res = await fetch(api + "/users/login", config);
    const result = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(result));

      return result;
    } else {
      return { errors: [result.errors || "Erro desconhecido"] };
    }
  } catch (error) {
    console.error("Erro no login:", error);
    return { errors: [error.message || "Erro desconhecido"] };
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
