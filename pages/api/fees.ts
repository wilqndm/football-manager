import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { playerId, paymentDate, amount } = req.body;

  // Walidacja wejścia
  if (!playerId || !paymentDate || !amount) {
    return res.status(400).json({ error: "Brak wymaganych danych." });
  }

  // Pobierz zawodnika
  const player = await prisma.player.findUnique({ where: { id: Number(playerId) } });
  if (!player || !player.joinedAt) {
    return res.status(400).json({ error: "Nie znaleziono zawodnika lub brak daty dołączenia." });
  }

  // Wylicz liczbę miesięcy opłaconych składką
  const monthsPaid = Math.floor(amount / 50);
  if (monthsPaid <= 0) {
    return res.status(400).json({ error: "Kwota za mała na opłacenie choćby jednego miesiąca." });
  }

  // Ustal od kiedy zacząć okres nowej składki
  let periodStart = new Date(player.joinedAt);
  const lastFee = await prisma.fee.findFirst({
    where: { playerId: player.id },
    orderBy: { periodEnd: "desc" }
  });
  if (lastFee && lastFee.periodEnd > periodStart) {
    periodStart = new Date(lastFee.periodEnd);
    periodStart.setDate(periodStart.getDate() + 1);
  }

  // Wylicz koniec okresu
  const periodEnd = new Date(periodStart);
  periodEnd.setMonth(periodEnd.getMonth() + monthsPaid - 1);

  // Zapisz składkę
  const fee = await prisma.fee.create({
    data: {
      playerId: player.id,
      amount,
      paymentDate: new Date(paymentDate),
      periodStart,
      periodEnd,
    }
  });

  res.status(201).json({ fee, monthsPaid, periodStart, periodEnd });
}
