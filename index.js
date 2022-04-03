#!/usr/bin/env node
import { program } from "commander";
import chooseLanguage from "./interactive-view/language.js";
import choosePackageManagement from "./interactive-view/package-management.js";
import installSpringBoot from "./service/springBootInstaller.js";
import renderLogo from "./view/figlet-wrapper.js";
import SpringInitializerParamBuilder from "./model/SpringInitializerParamBuilder.js";

// dependencies https://start.spring.io/dependencies

program
  .option("-n, --name <name>", "name of the project")
  .option("-i, --interactive", "interactive mode");

program.parse();

const options = program.opts();
const isInteractive = options.interactive ? true : false;
const springInitializerParamBuilder = new SpringInitializerParamBuilder();

await renderLogo("Quick Starter");

if (options.name) {
  const { name: projectName } = options;
  springInitializerParamBuilder.name(projectName)
}

if (isInteractive) {
  const language = await chooseLanguage();
  springInitializerParamBuilder.language(language)

  const packageManagementTool = await choosePackageManagement();
  springInitializerParamBuilder.projectManagementTool(packageManagementTool)
}

const springInitializerParam = springInitializerParamBuilder.build()

installSpringBoot(springInitializerParam);
