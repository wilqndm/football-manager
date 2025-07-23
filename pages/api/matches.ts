import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const matches = await prisma.match.findMany({
      include: { stats: true }
    });
    res.json(matches);
  } else if (req.method === "POST") {
    const { date, opponent, location } = req.body;
    const match = await prisma.match.create({
      data: { date: new Date(date), opponent, location }
    });
    res.json(match);
  } else {
    res.status(405).end();
  }
}
