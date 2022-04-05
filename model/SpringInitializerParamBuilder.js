export default class SpringInitializerParamBuilder {
  #projectName = "demo";
  #language;
  #projectManagementTool;
  #dependencies;

  projectName(projectName) {
    this.#projectName = projectName;
  }

  language(language) {
    this.#language = language;
  }

  projectManagementTool(projectManagementTool) {
    this.#projectManagementTool = projectManagementTool;
  }

  dependencies(dependencies) {
    this.#dependencies = dependencies;
  }

  build() {
    return {
      baseDir: this.#projectName,
      groupId: "com.example",
      artifactId: this.#projectName,
      name: this.#projectName,
      packageName: `com.example/${this.#projectName}`,
      language: this.#language,
      type: this.#projectManagementTool,
      dependencies: this.#dependencies ? this.#dependencies.join(',') : undefined
    };
  }
}
