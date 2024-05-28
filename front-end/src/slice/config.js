import { config } from "dotenv";
import { body } from "express-validator";

export const api = "http://localhost:5000/api";
export const upload = "http://localhost:5000/api/uploads";

export const requestConfig = (method, data, token = null) => {
  if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
