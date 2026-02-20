import { Request, Response } from 'express'; 
import * as service from './category.service';

export const getAllCategory = async (req: Request, res: Response) => {
  const data = await service.getAllCategory(req, res);
  res.json(data);
};