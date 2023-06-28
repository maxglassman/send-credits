import express, { Application } from 'express';
import routes from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import './setup-env';
dotenv.config({ path: '../.env' });
const app: Application = express();
const port = process.env.PORT || 8000; // Use dynamic port assigned by Heroku or default to 8000

//CORS
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
