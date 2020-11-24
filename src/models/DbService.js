class DbService {
  /**
   * @constructor
   * @param {ServerDao} serverDao
   */
  constructor(serverDao) {
    this.server = serverDao;
  }
}

export default DbService;
