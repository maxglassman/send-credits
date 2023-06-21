import express, { Application } from 'express';
import routes from './routes';

const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
