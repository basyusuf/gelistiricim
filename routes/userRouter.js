const express = require('express');
const router = express.Router();
const {getAllUser,updateUserForID,getUserForID,createUser,deleteUser} = require('../controller/userController');

/**
 * @swagger
 * /users:
 *   get:
 *     description: List All User
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: login
 *     security:
 *       - ApiKeyAuth: []
 */
router.get('/',getAllUser);

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     description: Get user for user id
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: User ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: get user
 *     security:
 *       - ApiKeyAuth: []
 */

router.get('/:user_id', getUserForID);

router.put('/:user_id', updateUserForID);

router.post('/', createUser);

/**
 * @swagger
 * /users/{user_id}:
 *   delete:
 *     description: Ban user for user id
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: User ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: get user
 *     security:
 *       - ApiKeyAuth: []
 */
router.delete('/:user_id', deleteUser);
module.exports = router;
