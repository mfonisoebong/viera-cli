import fs from "fs";

const CURR_DIR = process.cwd();

const createDirectoryContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const orignalFilePath = `${templatePath}/${file}`;

    const stats = fs.statSync(orignalFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(orignalFilePath, "utf8");

      if (file === ".npmignore") {
        file = ".gitignore";
      }

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;

      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`,
      );
    }
  });
};

export default createDirectoryContents;
