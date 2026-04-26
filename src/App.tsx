import { GalleryContainer } from "@components/GalleryContainer";
import { Loading } from "@components/Loading";
import { Navbar } from "@components/Navbar";
import { PasswordModal } from "@components/PasswordModal";
import { RandomButton } from "@components/RandomButton/randomButton";
import { useEncryptedData } from "@hooks/useEncryptedData";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useOpenInNewTab } from "@hooks/useOpenInNewTab";
import { useShuffleItems } from "@hooks/useShuffle";
import { useThumbnailOriginConfig } from "@hooks/useThumbnailOriginConfig";
import { ScrollRestoration } from "react-router-dom";
import z from "zod";

function App() {
  const commitVersion = __APP_COMMIT_VERSION__;
  const [password, setPassword] = useLocalStorage(z.string(), "password", "");
  const dataUrl = `${import.meta.env.BASE_URL}data.enc`;
  const [state, data, error] = useEncryptedData(
    dataUrl,
    password,
    commitVersion,
  );
  const items = useShuffleItems(data);
  const {
    thumbnailOriginCandidates,
    selectedThumbnailOrigin,
    selectThumbnailOrigin,
  } = useThumbnailOriginConfig(data);
  const { openInNewTab, setOpenInNewTab } = useOpenInNewTab();

  return (
    <>
      <ScrollRestoration
        getKey={(location) => `${location.pathname}${location.search}`}
      />
      <Navbar
        origin={data?.origin}
        commitVersion={commitVersion}
        thumbnailOriginCandidates={thumbnailOriginCandidates}
        selectedThumbnailOrigin={selectedThumbnailOrigin}
        onSelectThumbnailOrigin={selectThumbnailOrigin}
        openInNewTab={openInNewTab}
        onToggleOpenInNewTab={setOpenInNewTab}
      />
      <RandomButton />
      <section id="center">
        <PasswordModal
          initValue={password}
          state={state}
          error={error}
          onApply={setPassword}
        />
        <Loading loading={state === "loading"} />
        <GalleryContainer
          data={data}
          items={items}
          thumbnailOrigin={selectedThumbnailOrigin}
          openInNewTab={openInNewTab}
        />
      </section>
    </>
  );
}

export default App;
