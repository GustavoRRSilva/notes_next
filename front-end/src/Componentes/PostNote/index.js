import style from "./PostNote.module.css";
import Message from "../Message/message";
import {useState } from "react";
import { useDispatch } from "react-redux";

import { postNote } from "@/slice/notesSlice";
export default function index(props) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nota = { content };
    const resultAction = await dispatch(postNote(nota));

    if (postNote.fulfilled.match(resultAction)) {
      setError("");
    } else {
      setError(resultAction.payload);
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="|Digite aqui a sua nota"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input>
      <input type="submit" value="Enviar nota"></input>
      {error && <Message className={style.message} msg={error}></Message>}
    </form>
  );
}
