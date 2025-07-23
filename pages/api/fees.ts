import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const fees = await prisma.fee.findMany({
      include: { player: true }
    });
    res.json(fees);
  } else if (req.method === "POST") {
    const { playerId, month, paid } = req.body;
    const fee = await prisma.fee.create({
      data: { playerId: Number(playerId), month: new Date(month), paid }
    });
    res.json(fee);
  } else if (req.method === "PATCH") {
    const { id, paid } = req.body;
    const fee = await prisma.fee.update({
      where: { id: Number(id) },
      data: { paid }
    });
    res.json(fee);
  } else {
    res.status(405).end();
  }
}
