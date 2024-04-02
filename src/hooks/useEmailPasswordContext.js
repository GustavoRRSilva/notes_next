import { useContext } from "react";
import { EmailPasswordContext } from "@/context/EmailPasswordContext";

export const useEmailPasswordContext = () => {
  const context = useContext(EmailPasswordContext);
  if (!context) {
    console.log("Não existe contexto");
  }
  return context;
};
