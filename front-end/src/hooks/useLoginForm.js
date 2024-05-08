import { useState,useEffect } from "react";
import { validEmail, validPassword } from "@/utils/regex";
import { useEmailPasswordContext } from "@/hooks/useEmailPasswordContext";

const useLoginForm = (contas) => {
  const { setEmailAndPassword, loggedEmail, loggedPassword,loggedName } =
    useEmailPasswordContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [name, setName] = useState("");
  const [contaEncontrada, setContaEncontada] = useState(false);
  const validate = () => {
    setEmailErr(!validEmail.test(email));
    setPasswordErr(!validPassword.test(password));

    if (validPassword.test(password) && validEmail.test(email)) {
      contas.forEach((conta) => {
        if (conta.email === email && conta.password === password) {
          setContaEncontada(true);
          setName(conta.name);
          setEmailAndPassword(email, password,conta.name);
        }
      });
      if (contaEncontrada) {
        console.log("Existe conta");
      } else {
        console.log("Conta não encontrada");
      }
    }
  };
  useEffect(() => {
 
  }, [contaEncontrada]);
  return {
    email,
    setEmail,
    password,
    setPassword,
    emailErr,
    passwordErr,
    validate,
    name,
    contaEncontrada,
  };
};

export default useLoginForm;
