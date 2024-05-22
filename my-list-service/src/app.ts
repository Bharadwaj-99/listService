import express, { Application, Request, Response } from 'express';
import myListRoutes from './routes/myListRoutes';
import { connectToDatabase } from './utils/db';

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/mylist', myListRoutes);

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

// Connect to the database and start the server
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

