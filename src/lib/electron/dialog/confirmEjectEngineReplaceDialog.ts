import { ipcRenderer } from "electron";
import l10n from "../../helpers/l10n";

export default () => {
  const dialogOptions = {
    type: "info",
    buttons: [l10n("DIALOG_EJECT_REPLACE"), l10n("DIALOG_CANCEL")],
    defaultId: 0,
    cancelId: 1,
    title: l10n("DIALOG_EJECT_ENGINE_REPLACE"),
    message: l10n("DIALOG_EJECT_ENGINE_REPLACE"),
    detail: l10n("DIALOG_EJECT_ENGINE_REPLACE_DESCRIPTION"),
  };

  return ipcRenderer.sendSync("show-message-box-sync", dialogOptions);
};
