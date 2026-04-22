import z from "zod";
import styles from "./App.module.css";
import { GalleryContainer } from "./components/GalleryContainer";
import { PasswordModal } from "./components/PasswordModal";
import { useEncryptedData } from "./hooks/useEncryptedData";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [password, setPassword] = useLocalStorage(z.string(), "password", "");
  const [state, data, error] = useEncryptedData("/data.enc", password);
  return (
    <section id="center">
      <PasswordModal
        initValue={password}
        state={state}
        error={error}
        onApply={setPassword}
      />
      {state === "loading" && <div className={styles.loading}>Loading...</div>}
      <GalleryContainer data={data} />
    </section>
  );
}

export default App;
