import { createClient } from 'redis';
import { promisify } from 'util';
/**
 * creation of a redis
 * client class
 */

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    // Handle the "error" event when the client is not connected
    this.client.on('error', (error) => {
      console.log('Redis Connection Error:', error);
      this.isClientConnected = false;
    });
    // Handle the "connect" event when the client is connected
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
     * a functions that
     * checks if the client is connected
     * returns a boolean
     */

  isAlive() {
    return this.isClientConnected;
  }

  /**
     * get function that returns
     * the value of a key on the
     * redis db
     * @param {string}
     * @return {*}
     */

  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
    * Stores a key and its value along with an expiration time.
    * @param {String} key The key of the item to store.
    * @param {String | Number | Boolean} value The item to store.
    * @param {Number} duration The expiration time of the item in seconds.
    * @returns {Promise<void>}
   */

  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, value, duration);
  }

  /**
    * del a function that remove
    * hat takes a string key as argument
    * and remove the value in Redis for
    * this key
    * @return {Promise<void>}
    */

  async del(key) {
    await promisify(this.client.DEL)
      .bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
