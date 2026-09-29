import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tasks = [
    {
      title: 'Design Zenitty landing page',
      description: 'Create wireframes and high-fidelity mockups for the landing page',
      status: 'IN_PROGRESS' as const,
      priority: 'HIGH' as const,
      category: 'Work',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, vegetables',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      category: 'Shopping',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Morning yoga session',
      description: '30 minutes of stretching and meditation',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      category: 'Health',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Review pull requests',
      description: 'Check the open PRs on the main repository',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      category: 'Work',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Call mom',
      description: 'Weekly catch-up call',
      status: 'COMPLETED' as const,
      priority: 'MEDIUM' as const,
      category: 'Personal',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Read 20 pages of book',
      description: 'Continue reading "Atomic Habits"',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      category: 'Personal',
    },
    {
      title: 'Fix login bug',
      description: 'Users unable to login with special characters in password',
      status: 'IN_PROGRESS' as const,
      priority: 'HIGH' as const,
      category: 'Work',
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Schedule dentist appointment',
      description: 'Regular checkup',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      category: 'Health',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const task of tasks) {
    await prisma.task.create({ data: task });
  }

  console.log(`Seeded ${tasks.length} tasks`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
