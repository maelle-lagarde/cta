import userController from '../controllers/userController.js';

async function userRoutes(fastify, options) {
  fastify.post('/register', userController.registerUser);
  fastify.post('/login', userController.loginUser);
  fastify.get('/profile', { preHandler: [fastify.authenticate] }, userController.getUserProfile);
  fastify.put('/profile', { preHandler: [fastify.authenticate] }, userController.updateUserProfile);
  fastify.post('/logout', { preHandler: [fastify.authenticate] }, userController.logoutUser);
}

export default userRoutes;