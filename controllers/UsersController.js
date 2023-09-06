import sha1 from 'sha1';
import Bull from 'bull';
// import ObjectId from 'mongodb';
import dbClient from '../utils/db';
import TokenUtility from '../utils/TokenUtility';

/**
 * this is the userController
 */
const userQueue = new Bull('userQueue');
class userController {
  /** *
     * a function to do verification and
     * creating the user its an end point
     * @param {request, response}
     */
  static async postNew(request, response) {
    const { email, password } = request.body;
    if (!email) return response.status(400).json({ error: 'Missing email' });
    if (!password) return response.status(400).json({ error: 'Missing password' });
    const user = await dbClient.findUser({ email });
    if (user) return response.status(400).json({ error: 'Already exist' });
    const hashPassword = sha1(password);

    const createdUser = await dbClient.createUser({ email, password: hashPassword });
    userQueue.add({ userId: createdUser.insertedId });
    return response.status(201).json({ id: createdUser.insertedId, email });
  }

  static async getMe(request, response) {
    const tokenValue = request.headers['x-token'];
    // console.log(tokenValue);
    if (!tokenValue) return response.status(401).json({ error: 'Unauthorized' });
    const userId = await TokenUtility.retrieveBaseOnToken(request);
    // console.log(userId);
    // const objectId = new ObjectId(userId);
    if (!userId) return response.status(401).json({ error: 'Unauthorized' });
    // console.log(objectId);
    const user = await dbClient.findUserById(userId);
    if (!user) return response.status(401).json({ error: 'Unauthorized' });

    // console.log(user);
    return response.status(201).json({ id: user._id, email: user.email });
  }
}

export default userController;
