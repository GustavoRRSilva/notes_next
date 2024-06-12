import { getUserNotes } from "@/slice/notesSlice";
import { useSelector } from "react-redux";
import { useUser } from "@/contexts/userContext";
import { useEffect, useState } from "react";
import Note from "@/Componentes/Note/index";
import style from "@/styles/NotesContainer.module.css";
export default function NotesContainer(props) {
  const { notes, error } = useSelector((state) => state.notes);
  const [notesInit, setNotesInit] = useState(false);

  useEffect(() => {
    setNotesInit(true);
  }, [notes]);
  return (
    <ul className={style.listNotes}>
      {notesInit &&
        notes.map((note) => (
          <Note
            key={note.key} // Aqui a chave é passada diretamente
            content={note.content}
            data={note.data}
            id={note._id}
          />
        ))}
    </ul>
  );
}
