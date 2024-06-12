import { useUser } from "@/contexts/userContext";
import { api, requestConfig } from "@/utils/config";
import { useState } from "react";
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

    const data = await response.json();
    if (!response.ok) {
      console.log(data.errors)
      return {errors: [data.errors]}
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteNote = async(id) =>{
  try{
    const localStorageToken = localStorage.getItem("user");
    const jsonData = JSON.parse(localStorageToken);
    const token = jsonData.token;

    const config = requestConfig("DELETE",token);
    const response = await fetch(`${api}/notes/${id}`, config);
    const data = await response.json();

    if (!response.ok) {
      console.log(data.errors);
      return { errors: [data.errors] };
    }
    return data;
  } catch (error) {
    throw error;
  }
  }



const updateNote = async (id, note) => {
  try {
    const localStorageToken = localStorage.getItem("user");
    const jsonData = JSON.parse(localStorageToken);
    const token = jsonData.token;

    const config = requestConfig("PUT", token, note);

    const response = await fetch(`${api}/notes/${id}`, config);
    const data = await response.json();

    if (!response.ok) {
      console.log(data.errors);
      return { errors: [data.errors] };
    }
    return data;
  } catch (error) {
    throw error;
  }
};


const noteService = {
  getNotes,
  postNote,
  updateNote,
  deleteNote
};

export default noteService;
