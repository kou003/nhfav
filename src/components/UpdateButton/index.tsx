import styles from "./styles.module.css";

const CONFIRM_MESSAGE = "Do you want to update the data?";

type UpdateButtonProps = {
  repository: string;
  workflowToken: string;
  className?: string;
};

export function UpdateButton({
  repository,
  workflowToken,
  className,
}: UpdateButtonProps) {
  const hasAuth = repository.length > 0 && workflowToken.length > 0;
  const dispatchUrl = `https://api.github.com/repos/${repository}/dispatches`;
  const actionUrl = `https://github.com/${repository}/actions/workflows/update.yaml`;

  const onClick = async () => {
    if (!hasAuth) {
      return;
    }

    if (!window.confirm(CONFIRM_MESSAGE)) {
      return;
    }

    await fetch(dispatchUrl, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${workflowToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ event_type: "update" }),
    });
    window.open(actionUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      className={[className, styles.button].filter(Boolean).join(" ")}
      onClick={onClick}
      disabled={!hasAuth}
      title={hasAuth ? "Trigger update workflow" : "workflow token is missing"}
    >
      Update
    </button>
  );
}
