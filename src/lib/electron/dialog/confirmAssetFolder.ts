import { ipcRenderer } from "electron";
import { AssetFolder } from "../../project/assets";
import l10n from "../../helpers/l10n";

export default async (
  folders: AssetFolder[]
): Promise<AssetFolder | undefined> => {
  const cancelId = folders.length;
  const dialogOptions = {
    type: "info",
    buttons: ([] as string[]).concat(folders, l10n("DIALOG_CANCEL")),
    defaultId: 0,
    cancelId,
    title: l10n("DIALOG_IMPORT_ASSET"),
    message: l10n("DIALOG_IMPORT_ASSET"),
    detail: l10n("DIALOG_IMPORT_ASSET_DESCRIPTION"),
  };

  const res = await ipcRenderer.invoke("show-message-box-sync", dialogOptions);

  if (res === cancelId) {
    return undefined;
  }

  return folders[res];
};
