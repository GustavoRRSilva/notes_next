import { getUserNotes } from "@/slice/notesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Note from "@/Componentes/Note/index";
import style from "@/styles/NotesContainer.module.css";

export default function NotesContainer(props) {
  const dispatch = useDispatch();
  const { notes, error } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(getUserNotes());
  }, [dispatch]);

  const atualizarNotas = () => {
    dispatch(getUserNotes());
  };
  const reversedNotes = [...notes].reverse();
  return (
    <ul className={style.listNotes}>
      {reversedNotes &&
        reversedNotes.map((note) => (
          <Note
            key={note._id}
            id={note._id}
            content={note.content}
            data={note.data}
            atualizarNotas={atualizarNotas}
          />
        ))}
    </ul>
  );
}

