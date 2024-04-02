import "@/styles/globals.css";
import { EmailPasswordContextProvider } from "@/context/EmailPasswordContext";
export default function App({ Component, pageProps }) {
  return (
    <EmailPasswordContextProvider>
      <Component {...pageProps} />
    </EmailPasswordContextProvider>
  );
}
