import inquirer from "inquirer";
import { assert } from "console";

function choosePackageManagement() {
  return new Promise((res, rej) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "type",
          message: "What package management tool do you want to use?",
          choices: ["Maven Project", "Gradle Project"],
        },
      ])
      .then(({ type }) => {
        assert(type !== undefined, "package management tool should be chosen");
        res(type.toLowerCase().replace(" ", "-"));
      });
  });
}

export default choosePackageManagement;
