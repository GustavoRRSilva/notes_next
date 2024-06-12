// Importando estilos específicos para a página de notas
import styles from "@/styles/NotesPage.module.css";

// Importando hooks do React Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// Importando hooks do React
import { useEffect, useState } from "react";

// Importando componente para postar uma nova nota
import PostNote from "@/Componentes/PostNote";

// Importando ações para obter detalhes do usuário e notas
import { getUserDetails } from "@/slice/userSlice";
import { getUserNotes } from "@/slice/notesSlice";

// Importando container que exibe todas as notas
import NotesContainer from "@/Componentes/NotesContainer";
import AlertDeleteNote from "@/Componentes/AlertDeleteNote";


export default function PageNotes() {
  const { user, loading } = useSelector((state) => state.user);
  const [showPost, setShowPost] = useState(false);
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const dispatch = useDispatch();
  const openShowPost = () => {
    setShowPost((prevShowPost) => !prevShowPost); // Alterna o estado showPost
  };
  useEffect(() => {
    dispatch(getUserDetails());
    setShowNotes(true);
  }, [dispatch]);

  if (loading) {
    return <p>Carregando</p>;
  }
  return (
    <div className={styles.contentNext}>
      {showPost && <PostNote></PostNote>}
      
      <section className={styles.notesLeft}>
        <div className={styles.logoNotes}>
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.logoNotes}
          >
            <rect width="42" height="42" rx="5" fill="#E4C5C4" />
            <path
              d="M28.46 37H22.646L12.922 22.278V37H7.108V13.132H12.922L22.646 27.922V13.132H28.46V37Z"
              fill="#6F7357"
            />
            <path
              d="M34.8844 13.132V17.79H28.5604V37H22.7464V17.79H16.4224V13.132H34.8844Z"
              fill="#C8AD8D"
            />
          </svg>
        </div>
        <div className={styles.addButton} onClick={openShowPost}>
          <svg
            width="59"
            height="60"
            viewBox="0 0 59 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="29.5" cy="29.5" r="29.5" fill="#E4C5C4" />
            <path
              d="M39.48 31.48H31.4V39.76H27.16V31.48H19.08V27.64H27.16V19.36H31.4V27.64H39.48V31.48Z"
              fill="black"
            />
          </svg>
        </div>
      </section>
      {showNotes && <NotesContainer />}
    </div>
  );
}
