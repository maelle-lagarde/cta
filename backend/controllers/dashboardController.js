import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Récupère le username
async function getUsername(req, reply) {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true, objectives: true },
    });

    if (!user) {
      return reply.code(404).send({ message: "Utilisateur non trouvé." });
    }

    return reply.send(user);
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Erreur lors de la récupération du profil." });
  }
}

export default { getUsername };