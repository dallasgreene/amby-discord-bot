import { ServerDao } from '../Server';
import { HomieDao } from '../Homie';

class AmbyModel {
  constructor() {
    this.server = new ServerDao();
    this.homie = new HomieDao();
  }
}

export default AmbyModel;
