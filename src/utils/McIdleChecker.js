const util = require('minecraft-server-util');

class McIdleChecker {
  /**
   * @constructor
   * @param {McServer} mcServer
   * @param {AwsUtils} awsUtils
   */
  constructor(mcServer, awsUtils) {
    this.mcServer = mcServer;
    console.log(mcServer);
    this.awsUtils = awsUtils;
    this.checkInterval = 60; // in seconds
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
      console.log(server);
      let status;
      try {
        status = await util.status(server.getHost(), server.getPort(), { enableSRV: true });
      } catch (error) {
        console.log(error);
        return;
      }
      console.log(status);
      if (status.players.online <= 0) {
        idleChecker.receivedIdleResponse();
      } else if (idleChecker.isLastCheckIdle) {
        idleChecker.isLastCheckIdle = false;
      }
    };
    this.timeout = setInterval(isServerIdle, this.checkInterval * 1000, this.mcServer, this);
  }
}

export default McIdleChecker;
