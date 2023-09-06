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
    await redisClient.set(key, userId.toString(), 60 * 60 * 24);
    return token;
  }

  static async retrieveBaseOnToken(request) {
    const userToken = request.header['X-Token'];
    // console.log(userToken);
    const userId = await redisClient.get(`auth_${userToken}`);
    return userId;
  }

  static async deleteToken(request) {
    const token = request.header('X-Token');
    const key = `auth_${token}`;
    if (id) {
      await redisClient.del(key);
      response.status(204).json({});
    } else {
      response.status(401).json({ error: 'Unauthorized' });
    }
   
  }
}

export default TokenUtility;
