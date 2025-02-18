import dashboardController from '../controllers/dashboardController.js';

async function dashboardRoutes(fastify, options) {
  fastify.get('/dashboard', { preHandler: [fastify.authenticate] }, dashboardController.getUsername);
}

export default dashboardRoutes;