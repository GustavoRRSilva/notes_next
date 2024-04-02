import { useEmailPasswordContext } from "@/hooks/useEmailPasswordContext";
export default function PageNotes() {
    const { loggedEmail, loggedPassword,loggedName } = useEmailPasswordContext();
  return (
    <>
      <p>name:{loggedEmail}</p>
    </>
  );
}
