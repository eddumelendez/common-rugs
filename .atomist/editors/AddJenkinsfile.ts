import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Project } from '@atomist/rug/model/Project';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';

@Editor("AddJenkinsfile", "This is my newest editor... in TypeScript")
@Tags("jenkins", "ci")
export class AddJenkinsfile implements EditProject {

    @Parameter({
        displayName: "Agent's Label",
        description: "name of the jenkins node",
        pattern: Pattern.any
    })
    jenkins_agent_label: string;

    @Parameter({
        displayName: "JDK",
        description: "Name of the JDK",
        pattern: Pattern.any
    })
    jenkins_tool_jdk_name: string;

    @Parameter({
        displayName: "Slack Channel",
        description: "Name of the slack channel",
        pattern: Pattern.any
    })
    jenkins_environment_slack_channel: string;

    @Parameter({
        displayName: "Slack Team Domain",
        description: "Name of the slack team domain",
        pattern: Pattern.any
    })
    jenkins_environment_slack_team_domain: string;

    @Parameter({
        displayName: "Slack API Token",
        description: "Slack's api token",
        pattern: Pattern.any
    })
    jenkins_environment_slack_api_token: string;

    @Parameter({
        displayName: "Main branch",
        description: "Name of your main branch",
        pattern: Pattern.any
    })
    jenkins_environment_main_branch: string;

    @Parameter({
        displayName: "Build command",
        description: "Command to execute in the build stage",
        pattern: Pattern.any
    })
    jenkins_stage_build_command: string;

    @Parameter({
        displayName: "Artifacts",
        description: "Files to archive",
        pattern: Pattern.any
    })
    jenkins_stage_artifacts_location: string;

    @Parameter({
        displayName: "Test command",
        description: "command to execute in the test stage",
        pattern: Pattern.any
    })
    jenkins_stage_test_command: string;

    @Parameter({
        displayName: "SonarQube command",
        description: "ommand to execute in the SonarQube stage",
        pattern: Pattern.any
    })
    jenkins_stage_sonarqube_command: string;

    edit(project: Project, params: any) {
        project.merge("jenkinsfile.vm", "Jenkinsfile", params);
    }
}

export const addJenkinsfile = new AddJenkinsfile();
