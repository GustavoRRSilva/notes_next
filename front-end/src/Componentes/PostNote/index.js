import style from "./PostNote.module.css";
import Message from "../Message/message";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { postNote } from "@/slice/notesSlice";
export default function index(props) {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nota = { content };
    const localStorageToken = localStorage.getItem("user");

    // Parse JSON string
    const jsonData = JSON.parse(localStorageToken);

    const token = jsonData.token;
     // Cria o objeto nota com o conteúdo
    dispatch(postNote(nota));
    setContent("")
    /* try {
      const response = await fetch("http://localhost:5000/api/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nota),
        
      }
    
    );

      const data = await response.json();

      if (response.ok) {
        setError(false);
        setNota(""); // Limpa o campo de entrada
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    } */
    /*  */
  };

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit}
      style={{
        position: "absolute",
        top: "35%",
        left: "50%",
        height: "50%",
        width: "50%",
        transform: "translate(-50%, -50%)",
        margin: "auto",
      }}
    >
      <input
        type="text"
        placeholder="|Digite aqui a sua nota"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input>
      <input type="submit" value="Enviar nota"></input>
      <Message className={style.message}></Message>
    </form>
  );
}
