import "@/styles/globals.css";
import { Provider } from "react-redux";
import { UserProvider } from "@/contexts/userContext";
import { store } from "@/store";
import UserContext from "@/contexts/userContext";
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}
