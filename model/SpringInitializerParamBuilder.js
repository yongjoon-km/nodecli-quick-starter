export default class SpringInitializerParamBuilder {
  #projectName = "demo";
  #language;
  #projectManagementTool;

  projectName(projectName) {
    this.#projectName = projectName;
  }

  language(language) {
    this.#language = language;
  }

  projectManagementTool(projectManagementTool) {
    this.#projectManagementTool = projectManagementTool;
  }

  build() {
    return {
      baseDir: this.#projectName,
      groupId: "com.example",
      artifactId: this.#projectName,
      name: this.#projectName,
      packageName: `com.example/${this.#projectName}`,
      language: this.#language,
      type: this.#projectManagementTool
    };
  }
}
