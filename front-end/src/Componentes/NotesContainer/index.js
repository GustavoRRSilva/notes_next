import { getUserNotes } from "@/slice/notesSlice";
import { useSelector } from "react-redux";
import { useUser } from "@/contexts/userContext";
import { useEffect, useState } from "react";
import Note from "@/Componentes/Note/index";
import style from "@/styles/NotesContainer.module.css";
export default function NotesContainer(props) {
  const { notes, error } = useSelector((state) => state.notes);
  const notas = [];
  const contador = 0;
  return (
    <ul className={style.listNotes}>
      {notes &&
        notes.map((note) => (
          <Note
            key={note.key} // Aqui a chave é passada diretamente
            title={note.title}
            content={note.content}
            data={note.data}
          />
        ))}
    </ul>
  );
}
