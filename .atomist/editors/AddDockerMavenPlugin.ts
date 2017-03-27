import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Project } from '@atomist/rug/model/Project';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';
import { Pom } from '@atomist/rug/model/Pom';
import { PathExpressionEngine } from "@atomist/rug/tree/PathExpression";

/**
 * Sample TypeScript editor used by AddAddDockerMavenPlugin.
 */
@Editor("AddDockerMavenPlugin", "This is my newest editor... in TypeScript")
@Tags("docker")
export class AddDockerMavenPlugin implements EditProject {

    dockerMavenPlugin: string = 
            "<plugin>" +
			"	<groupId>com.spotify</groupId>" +
			"	<artifactId>docker-maven-plugin</artifactId>" +
			"	<version>0.4.13</version>" +
			"	<configuration>" +
            "		<imageName>${docker.image.prefix}/${project.build.finalName}</imageName>" +
            "		<dockerDirectory>${project.basedir}/src/main/docker</dockerDirectory>" +
            "			<imageTags>" +
            "				<imageTag>${project.version}</imageTag>" +
            "			</imageTags>" +
            "			<noCache>true</noCache>" +
            "			<resources>" +
            "				<resource>" +
            "					<targetPath>/</targetPath>" +
            "					<directory>${project.build.directory}</directory>" +
            "					<include>${project.build.finalName}.${project.packaging}</include>" +
            "				</resource>" +
            "			</resources>" +
			"	</configuration>" +
			"	<executions>" +
			"		<execution>" +
			"			<id>buildImage</id>" +
			"			<phase>package</phase>" +
			"			<goals>" +
			"				<goal>removeImage</goal>" +
			"				<goal>build</goal>" +
			"			</goals>" +
			"		</execution>" +
			"	</executions>" +
			"</plugin>"

    edit(project: Project) {
        let eng: PathExpressionEngine = project.context().pathExpressionEngine()
        eng.with<Pom>(project, "/Pom()", pom => {
            pom.addOrReplaceProperty("docker.image.prefix", "eddumelendez")
            pom.addOrReplaceBuildPlugin("com.spotify", "docker-maven-plugin", this.dockerMavenPlugin)
        })
    }
}

export const addDockerMavenPlugin = new AddDockerMavenPlugin();
