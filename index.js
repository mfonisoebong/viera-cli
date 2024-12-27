#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import createDirectoryContents from "./createDirectoryContents.js";
import { exec } from "child_process";
import { promisify } from "util";
import { VERSION } from "./constants/index.js";

const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));
const CHOICES = fs.readdirSync(`${__dirname}/templates`);

if (process.argv.includes("--version")) {
  console.log(`viera-cli version ${VERSION}`);
  process.exit(0);
}

const QUESTIONS = [
  {
    name: "project-choice",
    type: "list",
    message:
      "Welps!! Seems like you have a new project at hand, Senpai. Owwwoi!  (Starts twerking) What template would you like to use?",
    choices: CHOICES,
  },
  {
    name: "project-name",
    type: "input",
    message: "Name of project? 😌",
  },
];

async function run() {
  const answers = await inquirer.prompt(QUESTIONS).then((answers) => answers);

  const projectChoice = answers["project-choice"];
  const projectName = answers["project-name"];
  const templatePath = `${__dirname}/templates/${projectChoice}`;

  fs.mkdirSync(`${CURR_DIR}/${projectName}`);

  console.log("Creating project structure...🤖");

  createDirectoryContents(templatePath, projectName);

  console.log("Project structure created! 🎉");

  const install = await inquirer.prompt([
    {
      name: "install",
      type: "confirm",
      message: "Would you like to install dependencies?",
    },
  ]);

  if (!install["install"]) {
    console.log("Project is ready to go!");
    process.exit(0);
  }

  const installConfig = await inquirer
    .prompt([
      {
        name: "package-manager",
        type: "list",
        message: "Which package manager would you like to use?",
        choices: ["npm", "pnpm", "yarn"],
      },
    ])
    .then((answers) => answers);

  const execAsync = promisify(exec);

  switch (installConfig["package-manager"]) {
    case "npm":
      console.log("Installing dependencies with npm...🚀");
      await execAsync("npm install", {
        cwd: `${CURR_DIR}/${projectName}`,
      });
      break;

    case "pnpm":
      console.log("Installing dependencies with pnpm...🚀");
      await execAsync("pnpm install", {
        cwd: `${CURR_DIR}/${projectName}`,
      });
      break;

    case "yarn":
      console.log("Installing dependencies with yarn...🚀");
      await execAsync("yarn install", {
        cwd: `${CURR_DIR}/${projectName}`,
      });
      break;

    default:
      console.log("Installing dependencies with npm...🚀");
      await execAsync("npm install", {
        cwd: `${CURR_DIR}/${projectName}`,
      });
  }

  console.log("Project is ready to go!");
}

run();
