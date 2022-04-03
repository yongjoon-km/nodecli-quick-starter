#!/usr/bin/env node
import { program } from "commander";
import chooseLanguage from "./interactive-view/language.js";
import choosePackageManagement from "./interactive-view/package-management.js";
import installSpringBoot from "./service/springBootInstaller.js";
import renderLogo from "./view/figlet-wrapper.js";

// dependencies https://start.spring.io/dependencies

program
  .option("-n, --name <name>", "name of the project")
  .option("-i, --interactive", "interactive mode");

program.parse();

const options = program.opts();
const isInteractive = options.interactive ? true : false;
const springInitializerParam = {
  baseDir: "demo",
  groupId: "com.example",
  artifactId: "demo",
  name: "demo",
  packageName: "com.example/demo",
};

if (options.name) {
  const { name: projectName } = options;
  springInitializerParam.name = projectName;
  springInitializerParam.baseDir = projectName;
  springInitializerParam.artifactId = projectName;
  springInitializerParam.packageName = `${springInitializerParam.groupId}/${projectName}`;
}

await renderLogo("Quick Starter");

if (isInteractive) {
  const language = await chooseLanguage();
  springInitializerParam.language = language;

  const packageManagementTool = await choosePackageManagement();
  springInitializerParam.type = packageManagementTool;
}

installSpringBoot(springInitializerParam);
