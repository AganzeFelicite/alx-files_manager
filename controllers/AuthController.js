import { Buffer } from 'buffer';
import sha1 from 'sha1';
import dbClient from '../utils/db';
import TokenUtility from '../utils/TokenUtility';
/**
 * a class that authenticcates
 * a user
 */

class AuthController {
  static async getConnect(request, response) {
    const Authorization = request.header('Authorization') || '';
    // console.log("hellp")
    const infoCoded = Authorization.split(' ')[1];
    if (!infoCoded) return response.status(401).json({ error: 'Unauthorized' });
    const credentialsDecoded = Buffer.from(infoCoded, 'base64').toString(
      'utf-8',
    );

    const [email, password] = credentialsDecoded.split(':');
    if (!email || !password) return response.status(401).json({ error: 'Unauthorized' });
    const user = await dbClient.findUser({ email });
    if (!user) return response.status(401).json({ error: 'Unauthorized' });
    // console.log(user.password)
    if (sha1(password) !== user.password) return response.status(401).json({ error: 'Unauthorized' });
    const newToken = await TokenUtility.tokenGenerator(user._id);
    return response.status(200).json({ token: newToken });
  }

  static async getDisconnect(request, response) {
    const user = await TokenUtility.retrieveBaseOnToken(request);
    // console.log(hi)
    if (!user) return response.status(401).json({ error: 'Unauthorized' });
    await TokenUtility.getConnect(response);
    return request.status(201).end();
  }
}

export default AuthController;