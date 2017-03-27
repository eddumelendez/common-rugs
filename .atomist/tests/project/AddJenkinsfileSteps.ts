import { Project } from "@atomist/rug/model/Project";
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

const jenkinsfile = "Jenkinsfile"

When("AddJenkinsfile provides all the parameters", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddJenkinsfile");

    psworld.editWith(editor, { 
        jenkins_agent_label: "LIMA",
        jenkins_tool_jdk_name: "JDK_8b121",
        jenkins_environment_slack_channel: "#demo",
        jenkins_environment_slack_team_domain: "eddumelendez",
        jenkins_environment_slack_api_token: "eddumelendeztoken",
        jenkins_environment_main_branch: "master",
        jenkins_stage_build_command: "./gradlew clean build",
        jenkins_stage_artifacts_location: "**/build/*.jar",
        jenkins_stage_test_command: "./gradlew clean test",
        jenkins_stage_sonarqube_command: "./gradlew sonarqube"
    });
});

Then("the Jenkinsfile exists", (p, world) => {

    return p.fileExists(jenkinsfile);
});

Then("the Jenkinsfile contains the jenkins agent", (p, world) => {

    return p.fileContains(jenkinsfile, "LIMA");
});

Then("the Jenkinsfile contains the channel", (p, world) => {

    return p.fileContains(jenkinsfile, "#demo");
});

Then("the Jenkinsfile contains the teamdomain", (p, world) => {

    return p.fileContains(jenkinsfile, "eddumelendez");
});

Then("the Jenkinsfile contains the slack api token", (p, world) => {

    return p.fileContains(jenkinsfile, "eddumelendeztoken");
});

Then("the Jenkinsfile contains the jdk name", (p, world) => {

    return p.fileContains(jenkinsfile, "JDK_8b121");
});

Then("the Jenkinsfile contains the main branch", (p, world) => {

    return p.fileContains(jenkinsfile, "master");
});

Then("the Jenkinsfile contains the build command", (p, world) => {

    return p.fileContains(jenkinsfile, "./gradlew clean build");
});

Then("the Jenkinsfile contains the artifacts location", (p, world) => {

    return p.fileContains(jenkinsfile, "**/build/*.jar");
});

Then("the Jenkinsfile contains the test command", (p, world) => {

    return p.fileContains(jenkinsfile, "./gradlew clean test");
});

Then("the Jenkinsfile contains the sonarqube command", (p, world) => {

    return p.fileContains(jenkinsfile, "./gradlew sonarqube");
});
