import { GalleryContainer } from "@components/GalleryContainer";
import { Loading } from "@components/Loading";
import { Navbar } from "@components/Navbar";
import { PasswordModal } from "@components/PasswordModal";
import { RandomButton } from "@components/RandomButton/randomButton";
import { useEncryptedData } from "@hooks/useEncryptedData";
import { useLocalStorage } from "@hooks/useLocalStorage";
import z from "zod";

function App() {
  const [password, setPassword] = useLocalStorage(z.string(), "password", "");
  const [state, data, error] = useEncryptedData("/data.enc", password);
  return (
    <>
      <Navbar origin={data?.origin} />
      <RandomButton />
      <section id="center">
        <PasswordModal
          initValue={password}
          state={state}
          error={error}
          onApply={setPassword}
        />
        <Loading loading={state === "loading"} />
        <GalleryContainer data={data} />
      </section>
    </>
  );
}

export default App;
