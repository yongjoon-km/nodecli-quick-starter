import inquirer from "inquirer";
import { assert } from "console";

function inputProjectName() {
  return new Promise((res, rej) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "projectName",
          message: "What is the project name will be?",
          default() {
            return "demo";
          },
        },
      ])
      .then(({ projectName }) => {
        assert(projectName !== undefined, "projectName should be given");
        res(projectName);
      });
  });
}

export default inputProjectName;
