const { getStylesFilePath, updateParentTheme } = require("./index");
module.exports = {
  commands: [
    {
      name: "set-daynight",
      description:
        "Update android theme to DayNight (enable system-based darkmode)",
      func: () => {
        const path = getStylesFilePath(process.cwd());
        updateParentTheme(path, "Theme.AppCompat.DayNight.NoActionBar");
      }
    },
    {
      name: "set-themeparent <theme>",
      description: "Update android theme parent to the theme you specify",
      func: ([thene]) => {
        const path = getStylesFilePath(process.cwd());
        updateParentTheme(path, theme);
      }
    }
  ]
};
