import { Login } from "./Login";
import { useFetch } from "@/hooks/useFetch";
useEffect;
import { useEmailPasswordContext } from "@/hooks/useEmailPasswordContext";
import PageNotes from "./PageNotes";
import { useEffect, useState } from "react";
export default function Home() {
  const { loggedEmail, loggedPassword, loggedName } = useEmailPasswordContext();
  const [pagina, setPagina] = useState();
  useEffect(() => {
    if (loggedEmail) {
      setPagina(<PageNotes />);
    } else {
      setPagina(<Login />);
    }
  }, [loggedName]);
  return <>{pagina}</>;
}
