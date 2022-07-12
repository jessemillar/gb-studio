import { ipcRenderer } from "electron";
import l10n from "../../helpers/l10n";

export default () => {
  const dialogOptions = {
    type: "info",
    buttons: [l10n("DIALOG_EJECT"), l10n("DIALOG_CANCEL")],
    defaultId: 0,
    cancelId: 1,
    title: l10n("DIALOG_EJECT_ENGINE"),
    message: l10n("DIALOG_EJECT_ENGINE"),
    detail: l10n("DIALOG_EJECT_ENGINE_DESCRIPTION"),
  };

  return ipcRenderer.sendSync("show-message-box-sync", dialogOptions);
};
