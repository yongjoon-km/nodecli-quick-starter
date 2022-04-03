import inquirer from "inquirer";
import { assert } from "console";

function chooseLanguage() {
  return new Promise((res, rej) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "language",
          message: "What programming language do you want to use?",
          choices: ["Java", "Kotlin", "Groovy"],
        },
      ])
      .then(({ language }) => {
        assert(language !== undefined, "language should be chosen");
        res(language.toLowerCase());
      });
  });
}

export default chooseLanguage;