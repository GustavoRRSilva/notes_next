import style from "./message.module.css";

const Message = ({ msg, type }) => {
  return (
    <div className={style.message}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
