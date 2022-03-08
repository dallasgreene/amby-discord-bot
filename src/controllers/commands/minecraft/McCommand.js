import Command from '../../../definitions/Command';
import McServer from '../../../models/mc-server/McServer';
import AwsUtils from '../../../utils/AwsUtils';

class McCommand extends Command {
  /**
   * @constructor
   * @param {AmbyModel} model
   */
  constructor(model) {
    super(model, 'mc', 'mc <link|list|start|stop>',
      'Commands to manage minecraft servers',
      '');
    this.awsUtils = null;
  }

  /**
   * Initializes this command by providing it an AWS EC2 Client. This is used to make requests with
   * the AWS SDK to manage servers.
   * @param {EC2Client} awsClient
   */
  init(awsClient) {
    this.awsUtils = new AwsUtils(awsClient);
  }

  /**
   * Executes this command given a message object and an array of arguments.
   * @param {Message} msg
   * @param {String[]} args
   * @return {Promise<String>} The message that should be displayed to the user.
   */
  async go(msg, args) {
    if (this.awsClient === null) return 'AWS Client was not initialized.';
    const subCommand = args.shift().toLowerCase();
    if (subCommand === 'list') {
      return this.listMcServers();
    }
    if (subCommand === 'link') {
      return this.linkMcServer(args);
    }
    const server = await this.model.mcServer.findByAlias(args[0]);
    if (subCommand === 'info') {
      return this.infoMcServer(server);
    }
    if (subCommand === 'start') {
      return this.awsUtils.startMcServer(server);
    }
    if (subCommand === 'stop') {
      return this.awsUtils.stopMcServer(server);
    }
    return `${subCommand} is not a sub command of !${this.name}`;
  }

  async listMcServers() {
    const mcServers = await this.model.mcServer.findAll();
    return `${mcServers.map((server) => server.getAlias())}`;
  }

  async infoMcServer(server) {
    return `alias: ${server.getAlias()}\nIP: ${server.getHost()}:${server.getPort()}\nMod Pack: ${server.getModPack()}`;
  }

  async linkMcServer(args) {
    const [alias, instanceId, host, port, ...modPackArr] = args;
    const modPack = modPackArr.join(' ');
    const server = new McServer(instanceId, alias, host, port, modPack);
    await this.model.mcServer.create(server);
    return `Server successfully linked.\nalias: "${alias}", instanceId: "${instanceId}", host: "${host}:${port}" modPack: "${modPack}"`;
  }
}

export default McCommand;
