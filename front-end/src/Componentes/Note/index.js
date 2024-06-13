import { useDispatch } from "react-redux";
import { useState } from "react";

//Styles
import styles from "@/styles/Note.module.css";
//Slices
import { updateNote, deleteNote } from "@/slice/notesSlice";

//Component
import AlertDeleteNote from "../AlertDeleteNote";
import Message from "../Message/message";

export default function Notes({
  id,
  content,
  data,
  key,
  message,
  atualizarNotas,
}) {
  const dispatch = useDispatch();
  const colors = ["#6F7357", "#273A2D", "#a85163", "#2c2b4b"];
  const [valueNewInput, setValueNewInput] = useState(content);
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const [valueInput, setValueInput] = useState(content);
  const [inputColor] = useState(
    () => colors[Math.floor(Math.random() * colors.length)]
  );

  const handleChangeInputValue = () => {
    if (valueInput.length > 5) {
      setValueNewInput(valueInput);
      dispatch(
        updateNote({
          id,
          note: { content: valueInput },
        })
      ).then(() => {
        atualizarNotas();
      });
    } else {
      console.log("Error: input value must be greater than 5 characters");
    }
  };

  const deletarNote = () => {
    dispatch(deleteNote({ id })).then(() => {
      atualizarNotas();
    });
  };

  const toggleDeleteBox = () => {
    setOpenDeleteBox((openDeleteBox) => !openDeleteBox);
  };

  const toggleNote = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <li
      key={key}
      className={isOpen ? styles.NotaOpen : styles.nota}
      style={{ backgroundColor: inputColor }}
    >
      {openDeleteBox && (
        <AlertDeleteNote
          id={id}
          closeDeleteBox={() => setOpenDeleteBox(false)}
          deleteNote={deletarNote}
        />
      )}
      {isOpen && (
        <span className={styles.close} onClick={toggleNote}>
          X
        </span>
      )}
      {!isOpen && (
        <span className={styles.open} onClick={toggleDeleteBox}>
          X
        </span>
      )}

      {isOpen ? (
        <div className={styles.inputErro}>
          <input
            placeholder={content}
            style={{ backgroundColor: inputColor }}
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          />
        </div>
      ) : (
        <p className={styles.content}>{valueNewInput}</p>
      )}
      <div className={styles.dataAndChange}>
        {isOpen ? (
          <div className={styles.inputErro}>
            <button
              className={styles.enviarNota}
              onClick={handleChangeInputValue}
            >
              Trocar informações da nota
            </button>
            {valueInput.length <= 4 && (
              <p>A nota tem que possuir 5 letras no minímo</p>
            )}
          </div>
        ) : (
          <button className={styles.change} onClick={toggleNote}>
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_9_142)">
                <path
                  d="M21.6391 5.31556L17.8889 1.54611C17.641 1.29954 17.3057 1.16113 16.9561 1.16113C16.6065 1.16113 16.2711 1.29954 16.0233 1.54611L2.72803 14.8222L1.51414 20.0611C1.47227 20.2526 1.4737 20.4511 1.51834 20.642C1.56298 20.8328 1.6497 21.0113 1.77217 21.1644C1.89463 21.3175 2.04974 21.4413 2.22617 21.5267C2.4026 21.6122 2.59589 21.6572 2.79192 21.6583C2.88326 21.6676 2.9753 21.6676 3.06664 21.6583L8.36303 20.4444L21.6391 7.18111C21.8857 6.93329 22.0241 6.59792 22.0241 6.24833C22.0241 5.89875 21.8857 5.56338 21.6391 5.31556ZM7.72414 19.2944L2.75998 20.3358L3.89081 15.4675L13.8383 5.55833L17.6716 9.39167L7.72414 19.2944ZM18.5278 8.46528L14.6944 4.63194L16.9178 2.42139L20.6872 6.25472L18.5278 8.46528Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_9_142">
                  <rect width="23" height="23" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        )}
      </div>
    </li>
  );
}
