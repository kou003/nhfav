import { GalleryContainer } from "@components/GalleryContainer";
import { Loading } from "@components/Loading";
import { Navbar } from "@components/Navbar";
import { PasswordModal } from "@components/PasswordModal";
import { RandomButton } from "@components/RandomButton/randomButton";
import { useEncryptedData } from "@hooks/useEncryptedData";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useShuffleItems } from "@hooks/useShuffle";
import z from "zod";

function App() {
  const [password, setPassword] = useLocalStorage(z.string(), "password", "");
  const dataUrl = `${import.meta.env.BASE_URL}data.enc`;
  const [state, data, error] = useEncryptedData(dataUrl, password);
  const items = useShuffleItems(data);
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
        <GalleryContainer data={data} items={items} />
      </section>
    </>
  );
}

export default App;
