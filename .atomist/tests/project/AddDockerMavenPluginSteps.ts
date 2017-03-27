import { Project } from "@atomist/rug/model/Project";
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

const pomPath = "pom.xml"

Given("the pom root", p => {
    
    p.addFile(pomPath, 
    `<project>
       <modelVersion>4.0.0</modelVersion>
       <groupId>io.eddumelendez</groupId>
       <artifactId>demo</artifactId>
       <version>0.0.1</version>
       <packaging>jar</packaging>
       <properties>
       </properties>
       <build>
           <plugins>
           </plugins>
       </build>
    </project>`);
})

When("AddDockerMavenPlugin is executed", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddDockerMavenPlugin");

    psworld.editWith(editor, {});
});

Then("the pom file contains the property", (p, world) => {

    return p.fileContains(pomPath, "<docker.image.prefix>eddumelendez</docker.image.prefix>");
});

Then("the pom file contains docker-maven-plugin", (p, world) => {

    return p.fileContains(pomPath, "docker-maven-plugin");
});
