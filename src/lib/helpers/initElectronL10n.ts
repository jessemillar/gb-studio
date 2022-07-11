import { ipcRenderer } from "electron";
import { loadLanguage } from "./l10n";

let hasInitialised = false;

const initElectronL10n = () => {
  if (hasInitialised) {
    return;
  }
  const appLocale = ipcRenderer.sendSync("get-app-locale-sync");
  loadLanguage(appLocale);
  hasInitialised = true;
};

export default initElectronL10n;
