import style from "./message.module.css";

const Message = ({ msg, type }) => {
  return (
    <div className={style.message}>
      <p>{msg}O content tem que ter 3 letras</p>
    </div>
  );
};

export default Message;
