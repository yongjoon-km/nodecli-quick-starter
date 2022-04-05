import inquirer from "inquirer";
import { assert } from "console";
import fetchDependencies from "../client/dependencyFetcher.js";

async function chooseDependencies() {
  const dependencyMap = await fetchDependencies();
  const dependencyChoices = Object.keys(dependencyMap).sort();

  return new Promise((res, rej) => {
    inquirer
      .prompt([
        {
          type: "checkbox",
          name: "dependencies",
          message: "Choose dependencies you want to add!!!",
          choices: dependencyChoices,
        },
      ])
      .then(({ dependencies }) => {
        assert(dependencies !== undefined, "language should be chosen");
        res(dependencies);
      });
  });
}

export default chooseDependencies;
