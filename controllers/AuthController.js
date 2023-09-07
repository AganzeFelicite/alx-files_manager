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

    const credentialsDecoded = Buffer.from(infoCoded, 'base64').toString(
      'utf-8',
    );

    const [email, password] = credentialsDecoded.split(':');
    const sha1Password = sha1(password);
    const user = await dbClient.findUser({
      email,
      password: sha1Password,
    });

    if (sha1Password !== user.password) return response.status(401).json({ error: 'Unauthorized' });

    if (!user) return response.status(401).json({ error: 'Unauthorized' });
    // console.log(user.password)
    // console.log(user)
    const token = await TokenUtility.tokenGenerator(user._id.toString());

    return response.status(200).json({ token });
  }

  static async getDisconnect(request, response) {
    const user = await TokenUtility.retrieveBaseOnToken(request);
    
    if (!user) return response.status(401).json({ error: 'Unauthorized' });
    await TokenUtility.deleteToken(request);
    return response.status(204).end();
  }
}

export default AuthController;
