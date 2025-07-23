import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const players = await prisma.player.findMany({
      include: { fees: true, stats: true }
    });
    return res.json(players);
  }

  if (req.method === "POST") {
    const { firstName, lastName, birthDate, position } = req.body;

    // Prosta walidacja
    if (!firstName || !lastName || !birthDate || !position) {
      return res.status(400).json({ error: "Wszystkie pola są wymagane." });
    }

    try {
      const player = await prisma.player.create({
        data: {
          firstName,
          lastName,
          birthDate: new Date(birthDate),
          position,
          joinedAt: new Date(), // ustawia datę dołączenia na teraz
        },
      });
      return res.status(201).json(player);
    } catch (error) {
      return res.status(500).json({ error: "Błąd podczas tworzenia zawodnika." });
    }
  }

  res.status(405).end();
}
