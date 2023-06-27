import express, { Router } from 'express';
import HomeController from '../controllers/HomeController';
const router: Router = express.Router();

// Home routes
router.get('/', HomeController.index);

export default router;
