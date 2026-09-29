import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/stats
router.get('/', async (_req, res: Response) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  const [today, overdue, all, completedThisWeek] = await Promise.all([
    prisma.task.count({
      where: {
        dueDate: { gte: startOfDay, lt: endOfDay },
        status: { not: 'COMPLETED' },
      },
    }),
    prisma.task.count({
      where: {
        dueDate: { lt: startOfDay },
        status: { not: 'COMPLETED' },
      },
    }),
    prisma.task.count(),
    prisma.task.count({
      where: {
        status: 'COMPLETED',
        completedAt: { gte: startOfWeek, lt: endOfWeek },
      },
    }),
  ]);

  return res.json({ today, overdue, all, completedThisWeek });
});

export default router;
