import { useUser } from "@/contexts/userContext";
import { api, requestConfig } from "@/utils/config";

const getNotes = async (token) => {
  const config = requestConfig("GET", token);
  try {
    const res = await fetch(api + "/notes", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const postNote = async (note) => {
  try {
    const localStorageToken = localStorage.getItem("user");
    const jsonData = JSON.parse(localStorageToken);
    const token = jsonData.token;

    const response = await fetch("http://localhost:5000/api/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error("Failed to post note");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const noteService = {
  getNotes,
  postNote,
};

export default noteService;
