import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks';
import statsRouter from './routes/stats';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/tasks', tasksRouter);
app.use('/api/stats', statsRouter);

app.use(errorHandler);

export default app;
