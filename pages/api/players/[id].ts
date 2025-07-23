import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === "GET") {
    const player = await prisma.player.findUnique({
      where: { id: Number(id) },
      include: { fees: true, stats: true }
    });
    res.json(player);
  } else {
    res.status(405).end();
  }
}