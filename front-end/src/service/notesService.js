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

const noteService = {
  getNotes,
};

export default noteService;
