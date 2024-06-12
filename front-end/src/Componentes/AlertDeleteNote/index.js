import styles from "@/styles/AlertDeleteNote.module.css";
import { useDispatch } from "react-redux";
import Message from "../Message/message";

export default function alertDeleteNote({
  closeDeleteBox,
  deleteNote,
  message,
 
}) {
  
  return (
    <div className={styles.options}>
      <h2>Tem certeza que deseja deletar a nota?</h2>
      <span>
        <button onClick={deleteNote}>Sim</button>
        <button onClick={closeDeleteBox}>Não</button>
      </span>
      {message && (
        <Message
          styles="styles.msg"
          msg={"Nota excluida com sucesso"}
        ></Message>
      )}
    </div>
  );
}
