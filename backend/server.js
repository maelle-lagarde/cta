import Fastify from 'fastify';
import fastifyJWT from '@fastify/jwt';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const fastify = Fastify({ logger: true });

// CORS
fastify.register(cors, {
    origin: "*", // À sécuriser en production
    methods: ["GET", "POST", "PUT", "DELETE"],
});
  
// Configuration JWT
if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY est manquant dans le fichier .env");
}
  
fastify.register(fastifyJWT, { secret: process.env.SECRET_KEY });
  
// Middleware d'authentification
fastify.decorate("authenticate", async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
});
  
// Enregistre les routes
fastify.register(userRoutes);
fastify.register(dashboardRoutes);
  
// Démarre le serveur
const PORT = process.env.PORT || 3000;
fastify.listen({ port: PORT, host: '0.0.0.0' })
    .then(() => {
        console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
    })
    .catch(err => {
        console.error("Erreur au démarrage du serveur :", err);
        process.exit(1);
    });