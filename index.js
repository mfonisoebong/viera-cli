#!/usr/bin/env/ node

import inquirer from "inquirer";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import createDirectoryContents from "./createDirectoryContents.js";
import { exec } from "child_process";
import { promisify } from "util";

const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));
const CHOICES = fs.readdirSync(`${__dirname}/templates`);

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

  console.log("Domain expansion.....Purojekuto no sakusei 👉👈 👐");

  createDirectoryContents(templatePath, projectName);

  const installAnswers = await inquirer
    .prompt([
      {
        name: "npm-install",
        type: "confirm",
        message: "Would you like to run npm install?",
      },
    ])
    .then((answers) => answers);

  if (installAnswers["npm-install"]) {
    console.log(
      "Guaranteed installation....Domein no kakudai ga zōfuku sa reru...😠",
    );
    const execAsync = promisify(exec);
    await execAsync("npm install", {
      cwd: `${CURR_DIR}/${projectName}`,
    });
  }

  console.log(
    "Project ready Senpai! Go and make waifu mummy proud 🥺 (Starts shaking boobs) ",
  );
}

run();
