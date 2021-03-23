import express from 'express';
import setupRoutes from './routes';

const app = express();
app.use(express.json()); // para ler o body
setupRoutes(app);
export default app;
