import { createContext, useState } from "react";

export const EmailPasswordContext = createContext();


export const EmailPasswordContextProvider = ({ children }) => {
  const [loggedEmail, setLoggedEmail] = useState();
  const [loggedPassword, setLoggedPassword] = useState();
  const [loggedName, loggedSetName] = useState();
  const setEmailAndPassword = (email, password, name) => {
    setLoggedEmail(email);
    setLoggedPassword(password);
    loggedSetName(name);
  };
  return (
    <EmailPasswordContext.Provider
      value={{
        setEmailAndPassword,
        loggedEmail,
        loggedPassword,
        loggedName,
      }}
    >
      {children}
    </EmailPasswordContext.Provider>
  );
};
