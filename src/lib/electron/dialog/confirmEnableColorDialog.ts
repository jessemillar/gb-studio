import { ipcRenderer } from "electron";
import l10n from "../../helpers/l10n";

export default () => {
  const dialogOptions = {
    type: "info",
    buttons: [l10n("DIALOG_ENABLE_COLOR"), l10n("DIALOG_CANCEL")],
    defaultId: 0,
    cancelId: 1,
    title: l10n("DIALOG_ENABLE_COLOR_MODE"),
    message: l10n("DIALOG_ENABLE_COLOR_MODE"),
    detail: l10n("DIALOG_ENABLE_COLOR_MODE_DESCRIPTION"),
  };

  return ipcRenderer.sendSync(
    "show-message-box-on-main-window-sync",
    dialogOptions
  );
};
