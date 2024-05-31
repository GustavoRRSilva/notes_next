import styles from "@/styles/NotesPage.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useUser } from "@/contexts/userContext";
import { useEffect } from "react";
import { getUserDetails } from "@/slice/userSlice";
export default function PageNotes() {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails());
  }, []);
  return (
    <div className={styles.contentNext}>
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
      </section>
      <section className={styles.notasUser}>
        <h2>Notas do(a) {user.name}!</h2>
        <div className={styles.notas}>
          <div className={styles.nota}>
            <p className={styles.infoNota}>lalalalalalalal</p>
            <div className={styles.dataAndChange}>
              <p className={styles.data}>30 Fevereiro 2024</p>
              <button className={styles.change}>rosa</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
