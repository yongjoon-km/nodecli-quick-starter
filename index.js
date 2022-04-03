#!/usr/bin/env node
import { program } from "commander";
import chooseLanguage from "./interactive-view/language.js";
import choosePackageManagement from "./interactive-view/package-management.js";
import installSpringBoot from "./service/springBootInstaller.js";
import renderLogo from "./view/figlet-wrapper.js";
import SpringInitializerParamBuilder from "./model/SpringInitializerParamBuilder.js";
import inputProjectName from "./interactive-view/project-name.js";

// dependencies https://start.spring.io/dependencies

program
  .option("-n, --name <name>", "name of the project")
  .option("-l, --language [java, kotlin, groovy]", "programming language")
  .option("-p, --package-management [maven, gradle]", "package management tool")
  .option("-i, --interactive", "interactive mode");

program.parse();

const options = program.opts();
const isInteractive = options.interactive ? true : false;
const springInitializerParamBuilder = new SpringInitializerParamBuilder();

await renderLogo("Quick Starter");

if (options.name) {
  const { name: projectName } = options;
  springInitializerParamBuilder.projectName(projectName);
}

if (options.language) {
  const { language } = options;
  springInitializerParamBuilder.language(language);
}

if (options.packageManagement) {
  const { packageManagement } = options;
  const packageManagementTool = `${packageManagement}-project`
  springInitializerParamBuilder.projectManagementTool(packageManagementTool)
}

if (isInteractive) {
  const projectName = await inputProjectName();
  springInitializerParamBuilder.projectName(projectName);

  const language = await chooseLanguage();
  springInitializerParamBuilder.language(language);

  const packageManagementTool = await choosePackageManagement();
  springInitializerParamBuilder.projectManagementTool(packageManagementTool);
}

const springInitializerParam = springInitializerParamBuilder.build();

installSpringBoot(springInitializerParam);
