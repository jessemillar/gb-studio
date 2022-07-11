/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import settings from "electron-settings";
import { ipcRenderer } from "electron";
import darkTheme from "!!raw-loader!../../styles/theme-dark.css";
import lightTheme from "!!raw-loader!../../styles/theme.css";

const updateMyAppTheme = async () => {
  const settingsTheme = settings.get("theme");
  const theme =
    settingsTheme === "dark"
      ? "dark"
      : settingsTheme === "light"
      ? "light"
      : "system";

  const shouldUseDark = await ipcRenderer.invoke("should-use-dark-colors");

  const darkMode = theme === "dark" || (theme === "system" && shouldUseDark);

  const themeStyle = document.getElementById("theme");
  themeStyle.innerHTML = darkMode ? darkTheme : lightTheme;

  ipcRenderer.invoke("set-theme-source", theme);
};

ipcRenderer.on("native-theme-updated", () => {
  updateMyAppTheme();
});

ipcRenderer.on("update-theme", () => {
  updateMyAppTheme();
});

updateMyAppTheme();
