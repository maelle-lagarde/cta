import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const { hash, compare } = bcrypt;
const { sign } = jwt;

const JWT_SECRET = process.env.SECRET_KEY;
if (!JWT_SECRET) {
  throw new Error("SECRET_KEY is not defined in .env file");
}


// Inscription d'un utilisateur
async function registerUser(req, reply) {
  const { username, email, password } = req.body;

  try {
    // Vérifie si l'email est déjà utilisé
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return reply.code(400).send({ message: "Cet email est déjà utilisé." });
    }

    // Hash du mot de passe
    const hashedPassword = await hash(password, 10);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return reply.code(201).send({ message: "Utilisateur créé avec succès !" });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Erreur lors de l'inscription." });
  }
}

// Connexion d'un utilisateur
async function loginUser(req, reply) {
  const { email, password } = req.body;

  try {
    // Vérifie si l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return reply.code(400).send({ message: "Email ou mot de passe incorrect." });
    }

    // Vérifie le mot de passe
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return reply.code(400).send({ message: "Email ou mot de passe incorrect." });
    }

    // Génère un token JWT
    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    return reply.code(200).send({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Erreur lors de la connexion." });
  }
}

// Récupération du profil utilisateur
async function getUserProfile(req, reply) {
  try {
    const userId = req.user.userId; // Récupéré via middleware d'authentification

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

// Mise à jour du profil utilisateur
async function updateUserProfile(req, reply) {
  const userId = req.user.userId; // Récupéré via middleware d'authentification
  const { username, email, password } = req.body;

  try {
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return reply.send({ message: "Profil mis à jour avec succès.", user: updatedUser });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Erreur lors de la mise à jour du profil." });
  }
}

export default { registerUser, loginUser, getUserProfile, updateUserProfile };