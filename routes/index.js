import AppController from '../controllers/AppController';
import userController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const express = require('express');
/** *
 * creating a route for the app
 *
 */
const router = express.Router();

router.get('/status', (req, res) => {
  AppController.getStatus(req, res);
});
router.get('/stats', (req, res) => {
  AppController.getStats(req, res);
});

router.post('/users', (req, res) => {
  userController.postNew(req, res);
});

router.get('/connect', (req, res) => {
  AuthController.getConnect(req, res);
});

router.get('/disconnect', (req, res) => {
  AuthController.getDisconnect(req, res);
});

router.get('/users/me', (req, res) => {
  userController.getMe(req, res);
});
export default router;
