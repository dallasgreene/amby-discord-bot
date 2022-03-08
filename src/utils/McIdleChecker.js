import util from 'minecraft-server-util';

class McIdleChecker {
  /**
   * @constructor
   * @param {McServer} mcServer
   * @param {AwsUtils} awsUtils
   */
  constructor(mcServer, awsUtils) {
    this.mcServer = mcServer;
    this.awsUtils = awsUtils;
    this.isLastCheckIdle = false;
    this.timeout = null;
  }

  async receivedIdleResponse() {
    if (this.isLastCheckIdle) {
      await this.awsUtils.stopMcServer(this.mcServer);
      clearInterval(this.timeout);
    } else {
      this.isLastCheckIdle = true;
    }
  }

  begin() {
    const isServerIdle = async (server, idleChecker) => {
      const status = await util.status(server.getHost(), server.getPort(), { enableSRV: true });
      console.log(status);
      if (status.players.online <= 0) {
        idleChecker.receivedIdleResponse();
      }
    };
    this.timeout = setInterval(isServerIdle, 600 * 1000, [this.mcServer, this]);
  }
}

export default McIdleChecker;
