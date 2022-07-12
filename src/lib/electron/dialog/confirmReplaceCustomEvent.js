import { ipcRenderer } from "electron";
import l10n from "../../helpers/l10n";

export default (name) => {
  const dialogOptions = {
    type: "info",
    buttons: [l10n("DIALOG_REPLACE"), l10n("DIALOG_KEEP")],
    defaultId: 0,
    cancelId: 1,
    title: l10n("DIALOG_REPLACE_CUSTOM_EVENT", { name }),
    message: l10n("DIALOG_REPLACE_CUSTOM_EVENT", { name }),
    detail: l10n("DIALOG_REPLACE_CUSTOM_EVENT_DESCRIPTION"),
  };

  return ipcRenderer.sendSync("show-message-box-sync", dialogOptions);
};
