import express, { Application } from 'express';
import routes from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const app: Application = express();
const port = process.env.EXPRESS_PORT;

//CORS
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
