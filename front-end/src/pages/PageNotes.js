import styles from "@/styles/NotesPage.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useUser } from "@/contexts/userContext";
import { useEffect } from "react";
export default function PageNotes() {
  const { user, setUser } = useUser();

  const fetchUserProfile = async () => {
    const localStorageToken = localStorage.getItem('user');

    // Parse JSON string
    const jsonData = JSON.parse(localStorageToken);
    
    // Access the token property
    const token = jsonData.token;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch("http://localhost:5000/api/users/profile", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
       setUser(data)
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  fetchUserProfile()
    .then((profile) => {
      // Faça o que quiser com o perfil do usuário
    })
    .catch((error) => {
      // Lidar com erros, se necessário
    });
  return (
    <>
      <main styles={styles.main}>
        <h2>{user.name}</h2>
        <h3></h3>
      </main>
    </>
  );
}
