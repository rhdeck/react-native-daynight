const { readFileSync, writeFileSync } = require("fs");
const { sync: glob } = require("glob");
const { join } = require("path");
const { parseStringPromise, Builder } = require("xml2js");
const getStylesFilePath = (path = process.cwd(), night = false) => {
  const values = night ? "values-dark" : "values";
  const stylesGlob = glob(
    join(
      path,
      "android",
      "app",
      "**",
      "src",
      "main",
      "**",
      values,
      "styles.xml"
    )
  );
  if (!stylesGlob || !stylesGlob.length) throw "this has not styles.xml file";
  return stylesGlob[0];
};
const updateParentTheme = async (
  path = process.cwd(),
  newTheme = "Theme.AppCompat.Light.NoActionBar"
) => {
  const source = readFileSync(path, { encoding: "utf8" });
  const o = await parseStringPromise(source);
  const x = o.resources.style.filter(({ $: { name } }) => name === "AppTheme");
  x.map(o => (o.$.parent = newTheme));
  const builder = new Builder();
  //   console.log(builder);
  const out = builder.buildObject(o);
  writeFileSync(path, out);
};
module.exports = { getStylesFilePath, updateParentTheme };
