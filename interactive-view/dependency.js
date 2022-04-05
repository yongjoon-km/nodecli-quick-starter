import inquirer from "inquirer";
import { assert } from "console";
import fetchDependencies from "../client/dependencyFetcher.js";
import inquirerCheckboxPlusPrompt from "inquirer-checkbox-plus-prompt";
import fuzzy from "fuzzy";
import chalk from "chalk";

// Add searchable checkbox plugin
inquirer.registerPrompt("checkbox-plus", inquirerCheckboxPlusPrompt);

async function chooseDependencies() {
  const dependencyMap = await fetchDependencies();
  const dependencyChoices = Object.keys(dependencyMap).sort();
  const promptMessage = `Choose dependencies you want to add!!!
    ${chalk.greenBright("✔︎")} ${chalk.greenBright("<space>")} to select ${chalk.greenBright("<enter>")} to finish 🔎)`;

  return new Promise((res, rej) => {
    inquirer
      .prompt([
        {
          type: "checkbox-plus",
          name: "dependencies",
          highlight: true,
          searchable: true,
          message: promptMessage,
          source: (_, input) => {
            input = input || "";

            return new Promise((resolve) => {
              const fuzzyResult = fuzzy.filter(input, dependencyChoices);
              const data = fuzzyResult.map((element) => element.original);
              resolve(data);
            });
          },
        },
      ])
      .then(({ dependencies }) => {
        assert(dependencies !== undefined, "language should be chosen");
        res(dependencies);
      });
  });
}

export default chooseDependencies;
