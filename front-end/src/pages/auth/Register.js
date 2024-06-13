import React, { useState } from "react";
import Message from "@/Componentes/Message/message";
import styles from "@/styles/Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "@/slice/authSlice";
import next from "next";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [sucesso,setSucesso] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const validateName = (name) => {
    if (name.length <= 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Seu nome tem que possuir mais de 3 letras",
      }));
    } else {
      setErrors((prevErrors) => {
        const { name, ...rest } = prevErrors;
        return rest;
      });
    }
    setName(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Valor de email inválido",
      }));
    } else {
      setErrors((prevErrors) => {
        const { email, ...rest } = prevErrors;
        return rest;
      });
    }
    setEmail(email);
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Senha tem que ter 6 digitos",
      }));
    } else {
      setErrors((prevErrors) => {
        const { password, ...rest } = prevErrors;
        return rest;
      });
    }
    setPassword(password);
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Senhas não coincidem",
      }));
    } else {
      setErrors((prevErrors) => {
        const { confirmPassword, ...rest } = prevErrors;
        return rest;
      });
    }
    setConfirmPassword(confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validações finais antes do envio do formulário
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    // Se não houver erros, enviar o formulário
    if (Object.keys(errors).length === 0) {
      const user = {
        name,
        email,
        password,
        confirmPassword: confirmPassword,
      };

      const resultAction = await dispatch(register(user));
      if (register.fulfilled.match(resultAction)) {
        setSucesso(true)
      } else {
        console.log(resultAction.payload[0]);
        setError(resultAction.payload[0]);
      }
    }
  };

  const isDisabled = Object.keys(errors).length > 0;
  return (
    <div className={styles.register}>
      <section>
        <h1>Registre sua conta</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => validateName(e.target.value)}
            className={styles.input}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

          <input
            type="email"
            placeholder="Digite seu Email"
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
            className={styles.input}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            className={styles.input}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => validateConfirmPassword(e.target.value)}
            className={styles.input}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}
          {error && <Message msg={error}></Message>}
          {sucesso && <p className= {styles.sucesso}>Cadastro feito com sucesso!</p>}
          <input
            type="submit"
            className={styles.submit}
            disabled={isDisabled}
          />
        </form>
      </section>
    </div>
  );
}
