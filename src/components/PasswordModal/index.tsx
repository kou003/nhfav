import type { EncryptState } from "@hooks/useEncryptedData";
import { useState } from "react";
import Modal from "react-modal";
import styles from "./styles.module.css";

type PasswordModalProps = {
  initValue: string;
  state: EncryptState;
  onApply?: (password: string) => void;
  error?: Error | null;
};

export function PasswordModal({
  initValue,
  state,
  onApply,
  error,
}: PasswordModalProps) {
  const [inputValue, setInputValue] = useState(initValue);

  return (
    <Modal className={styles.passwordModal} isOpen={state === "idle"}>
      <form
        method="dialog"
        onSubmit={(e) => {
          e.preventDefault();
          onApply?.(inputValue);
        }}
      >
        <h2>Password</h2>
        <input
          type="password"
          name="password"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Apply</button>
      </form>
      {error && (
        <div className={styles.errorView}>
          <h2>ERROR</h2>
          <pre>
            <code>{error.toString()}</code>
          </pre>
        </div>
      )}
    </Modal>
  );
}
