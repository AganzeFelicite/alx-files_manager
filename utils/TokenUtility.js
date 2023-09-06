import { v4 as uuidv4 } from 'uuid';
import redisClient from './redis';
/**
 * a class that allows to generated and manage the
 * token in the redis db
 */

class TokenUtility {
  static async tokenGenerator(userId) {
    const token = uuidv4();
    const key = `auth_${token}`;
    await redisClient.set(key, userId, 60 * 60 * 24);
    return token;
  }

  static async retrieveBaseOnToken(request) {
    const userToken = request.header('X-Token');
    const userId = await redisClient.get(`auth_${userToken}`);
    return userId;
  }

  static async deleteToken(request) {
    const userToken = request.header('X-Token');
    await redisClient.del(`auth_${userToken}`);
  }
}

export default TokenUtility;
