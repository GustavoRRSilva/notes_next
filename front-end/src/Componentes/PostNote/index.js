import style from "./PostNote.module.css";
import Message from "../Message/message";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { postNote } from "@/slice/notesSlice";
export default function index(props) {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const {notes,errors} = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nota = { content };
    dispatch(postNote(nota));
    setContent("")
    console.log(errors)
  };

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit}
      
    >
      <input
        type="text"
        placeholder="|Digite aqui a sua nota"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input>
      <input type="submit" value="Enviar nota"></input>
      {error && <Message className={style.message}></Message>}
    </form>
  );
}
