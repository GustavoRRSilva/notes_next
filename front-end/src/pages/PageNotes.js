import { useEmailPasswordContext } from "@/hooks/useEmailPasswordContext";
import styles from "@/styles/NotesPage.module.css"
export default function PageNotes() {
  const { loggedEmail, loggedPassword, loggedName } = useEmailPasswordContext();
  return (
    <>
    

     <main styles = {styles.main}>
      <p>{loggedName}</p>
     </main>
    </>
  );
}
