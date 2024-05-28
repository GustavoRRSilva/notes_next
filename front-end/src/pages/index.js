import { Login } from "./auth/Login";
useEffect;
import PageNotes from "./PageNotes";
import { useEffect, useState } from "react";
export default function Home() {
  const loggedName = "";
  const [pagina,setPagina] = useState("")
  useEffect(() => {
    if (loggedName) {
      setPagina(<PageNotes />);
    } else {
      setPagina(<Login />);
    }
  }, [loggedName]);
  return <>{pagina}</>;
}