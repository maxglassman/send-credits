import { Request, Response } from 'express';
import { getAllPools } from '../services/poolContractService';

const HomeController = {
  async index(req: Request, res: Response) {
    try {
      const poolData = await getAllPools();
      return res.json(poolData);
    } catch (error) {
      console.error('Error fetching poolData:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default HomeController;
