#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import createDirectoryContents from "./createDirectoryContents.js";
import { exec } from "child_process";
import { promisify } from "util";
import { VERSION } from "./constants/index.js";
import { zodValidator } from "./lib/utils/zod.js";
import { templateConfigSchema } from "./lib/schema/templateConfig.js";

const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.argv.includes("--version")) {
  console.log(`viera-cli version ${VERSION}`);
  process.exit(0);
}

async function run() {
  const templates = fs.readdirSync(`${__dirname}/templates`);

  const templateConfigs = templates.map((template) => {
    const data = fs.readFileSync(
      `${__dirname}/templates/${template}/config.json`,
      {
        encoding: "utf-8",
      },
    );
    return JSON.parse(data);
  });

  const firstSet = [
    {
      name: "template",
      type: "list",
      message: "What project template would you like to generate?",
      choices: templateConfigs.map((config) => config.name),
    },
    {
      name: "name",
      type: "input",
      message: "Project name:",
      validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) {
          return true;
        }
        return "Project name may only include letters, numbers, underscores and hashes.";
      },
    },
  ];

  const firstSetAnswers = await inquirer.prompt(firstSet);

  const config = templateConfigs.find(
    (config) => config.name === firstSetAnswers["template"],
  );

  const validate = zodValidator(templateConfigSchema, config);
  if (validate.error) {
    console.log("Error validating template config schema 🚨❗❗");
    console.error(validate.error.errors);
    process.exit(1);
  }

  const versions = config.versions;

  const secondSet = [
    {
      name: "version",
      type: "list",
      message: "What version would you like to use?",
      choices: versions,
    },
  ];

  const secondSetAnswers = await inquirer.prompt(secondSet);
  const templatesList = versions.find(
    (version) => version.name === secondSetAnswers["version"],
  ).templates;

  const thirdSet = [
    {
      name: "template",
      type: "list",
      message: "What template would you like to use?",
      choices: templatesList,
    },
  ];

  const thirdSetAnswers = await inquirer.prompt(thirdSet);
  const selectedTemplate = templatesList.find(
    (template) => template.name === thirdSetAnswers["template"],
  );

  const templatePath = `${__dirname}/${selectedTemplate.path}`;

  fs.mkdirSync(`${CURR_DIR}/${firstSetAnswers["name"]}`);

  createDirectoryContents(templatePath, firstSetAnswers["name"]);

  const fourthSet = [
    {
      name: "install",
      type: "confirm",
      message: "Would you like to install dependencies?",
    },
  ];

  const fourthSetAnswers = await inquirer.prompt(fourthSet);

  if (fourthSetAnswers["install"]) {
    const selectedConfig = templateConfigs.find(
      (config) => config.name === firstSetAnswers["template"],
    );
    const packageManagers = selectedConfig.packageManagers;

    const fifthSet = [
      {
        name: "packageManager",
        type: "list",
        message: "What package manager would you like to use?",
        choices: packageManagers,
      },
    ];

    const fifthSetAnswers = await inquirer.prompt(fifthSet);

    const packageManager = fifthSetAnswers["packageManager"];
    const selectedManager = packageManagers.find(
      (manager) => manager.name === packageManager,
    );

    const installCommands = selectedManager.commands;

    const install = promisify(exec);

    console.log("Installing dependencies 👷📥...");

    for (const command of installCommands) {
      try {
        await install(command.command, {
          cwd: `${CURR_DIR}/${firstSetAnswers["name"]}`,
        });
      } catch (e) {
        console.log("Error installing dependencies", e);
        process.exit(1);
      }
    }

    console.log("Dependencies installed successfully 📦!");
  }

  console.log("Project generated successfully!");
}

run();
