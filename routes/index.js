import AppController from '../controllers/AppController';
import userController from '../controllers/UsersController';

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

export default router;
