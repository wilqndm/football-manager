import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const players = await prisma.player.findMany({
      include: { fees: true, stats: true }
    });
    res.json(players);
  } else if (req.method === "POST") {
    const { firstName, lastName, birthDate, position } = req.body;
    const player = await prisma.player.create({
      data: { firstName, lastName, birthDate: new Date(birthDate), position }
    });
    res.json(player);
  } else {
    res.status(405).end();
  }
}