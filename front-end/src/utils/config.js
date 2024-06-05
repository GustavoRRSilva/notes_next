export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

export const requestConfig = (method, token = null, data, note = null) => {
  let config;
  console.log(method, token, data, note);
  if (note) {
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {},
    };
  } else if (method === "DELETE") {
    config = {
      method: method,
      headers: {},
    };
  } else {
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(config.body);
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(config);
  return config;
};
