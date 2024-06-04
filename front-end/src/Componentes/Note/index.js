import styles from "@/styles/Note.module.css";
export default function Notes(props) {
  return (
    <li key={props.key} className={styles.nota}>
      <p className={styles.infoNota}>{props.title}</p>
      <p className={styles.content}>{props.content}</p>
      <div className={styles.dataAndChange}>
        <p className={styles.data}>{props.data}</p>
        <button className={styles.change}>✏️</button>
      </div>
    </li>
  );
}
