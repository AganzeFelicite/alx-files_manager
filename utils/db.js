const { MongoClient, ObjectId } = require('mongodb');
/**
 * this is a mongo
 * db client class
 */

const host = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbDataBase = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${dbPort}`;

class DBClient {
  // contructor of the mongodb client
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect();
    this.db = this.client.db(dbDataBase);
  }

  /**
     * isAlive is a function
     * that returns true if the
     * client is connected
     * @param {nothing}
     */

  isAlive() {
    return this.client.isConnected();
  }

  /**
     * nbUsers is a function that returns the
     * number of documents in the collection
     * users
     */
  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async findUser(user) {
    return this.db.collection('users').findOne(user);
  }

  async createUser(user) {
    return this.db.collection('users').insertOne(user);
  }
  /**
     * nbFiles is a function that
     * returns the number of document
     * on the collection files
     * @param {0}
     */

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }

  /**
   * find user by id
   */
  async findUserById(userId) {
    const user = this.db.collection('users').findOne({ _id: ObjectId(userId) });
    // Handle the user data or errors here
    return user;
  }
}

const dbClient = new DBClient();
export default dbClient;
