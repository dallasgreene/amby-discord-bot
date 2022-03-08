import { ServerDao } from '../Server';
import { HomieDao } from '../Homie';
import McServerDao from '../mc-server/McServerDao';

class AmbyModel {
  constructor() {
    this.server = new ServerDao();
    this.homie = new HomieDao();
    this.mcServer = new McServerDao();
  }
}

export default AmbyModel;
