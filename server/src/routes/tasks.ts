import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createTaskSchema, updateTaskSchema, queryParamsSchema } from '../validation/taskSchemas';
import { TaskQueryParams } from '../types';

const router = Router();
const prisma = new PrismaClient();

// GET /api/tasks
router.get('/', async (req: Request, res: Response) => {
  const parsed = queryParamsSchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({
      error: { message: 'Invalid query parameters', details: parsed.error.errors },
    });
  }

  const { search, status, priority, category, sort } = parsed.data as TaskQueryParams;

  const where: Record<string, unknown> = {};
  if (search) {
    where.title = { contains: search };
  }
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (category) where.category = category;

  const orderBy: Record<string, string> = {};
  if (sort === 'dueDate') {
    orderBy.dueDate = 'asc';
  } else if (sort === 'priority') {
    orderBy.priority = 'desc';
  } else {
    orderBy.createdAt = 'desc';
  }

  const tasks = await prisma.task.findMany({
    where,
    orderBy,
  });

  return res.json(tasks);
});

// GET /api/tasks/:id
router.get('/:id', async (req: Request, res: Response) => {
  const task = await prisma.task.findUnique({
    where: { id: req.params.id },
  });

  if (!task) {
    return res.status(404).json({ error: { message: 'Task not found' } });
  }

  return res.json(task);
});

// POST /api/tasks
router.post('/', async (req: Request, res: Response) => {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: { message: 'Validation failed', details: parsed.error.errors },
    });
  }

  const { title, description, status, priority, category, dueDate } = parsed.data;

  const task = await prisma.task.create({
    data: {
      title,
      description: description ?? null,
      status: status ?? 'TODO',
      priority: priority ?? 'MEDIUM',
      category: category ?? 'Other',
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  });

  return res.status(201).json(task);
});

// PATCH /api/tasks/:id
router.patch('/:id', async (req: Request, res: Response) => {
  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: { message: 'Validation failed', details: parsed.error.errors },
    });
  }

  const existing = await prisma.task.findUnique({
    where: { id: req.params.id },
  });

  if (!existing) {
    return res.status(404).json({ error: { message: 'Task not found' } });
  }

  const { title, description, status, priority, category, dueDate } = parsed.data;

  const task = await prisma.task.update({
    where: { id: req.params.id },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(status !== undefined && { status }),
      ...(priority !== undefined && { priority }),
      ...(category !== undefined && { category }),
      ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
      ...(status === 'COMPLETED' && { completedAt: new Date() }),
      ...(status && status !== 'COMPLETED' && { completedAt: null }),
    },
  });

  return res.json(task);
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const existing = await prisma.task.findUnique({
    where: { id: req.params.id },
  });

  if (!existing) {
    return res.status(404).json({ error: { message: 'Task not found' } });
  }

  await prisma.task.delete({
    where: { id: req.params.id },
  });

  return res.status(204).send();
});

export default router;
