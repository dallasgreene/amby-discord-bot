import { StartInstancesCommand, StopInstancesCommand, DescribeInstanceStatusCommand } from '@aws-sdk/client-ec2';
import McIdleChecker from './McIdleChecker';

class AwsUtils {
  /**
   * @constructor
   * @param {EC2Client} awsClient
   */
  constructor(awsClient) {
    this.awsClient = awsClient;
  }

  /**
   * Starts a minecraft server.
   * @param {McServer} server
   * @return {Promise<string>}
   */
  async statusMcServer(server) {
    const data = await this.awsClient.send(
      new DescribeInstanceStatusCommand({
        IncludeAllInstances: true,
        InstanceIds: [server.getInstanceId()],
      }),
    );
    return `Status of ${server.getAlias()}: "${data.InstanceStatuses[0].InstanceState.Name}"`;
  }

  /**
   * Stops a minecraft server.
   * @param {McServer} server
   * @return {Promise<string>}
   */
  async stopMcServer(server) {
    const data = await this.awsClient.send(
      new StopInstancesCommand({ InstanceIds: [server.getInstanceId()] }),
    );
    data.StoppingInstances.forEach((instance) => console.log(instance));
    return `Success stopping: ${data.StoppingInstances}`;
  }

  /**
   * Starts a minecraft server.
   * @param {McServer} server
   * @return {Promise<string>}
   */
  async startMcServer(server) {
    const data = await this.awsClient.send(
      new StartInstancesCommand({ InstanceIds: [server.getInstanceId()] }),
    );
    const idleChecker = new McIdleChecker(server, this);
    idleChecker.begin();
    data.StartingInstances.forEach((instance) => console.log(instance));
    return `Success starting: ${data.StartingInstances}`;
  }
}

export default AwsUtils;
