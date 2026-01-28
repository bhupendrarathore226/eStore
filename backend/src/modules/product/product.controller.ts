import { Request, Response } from 'express';
import * as service from './product.service';

export const getProducts = async (_: Request, res: Response) => {
  const data = await service.getAllProducts();
  res.json(data);
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await service.getProductById(Number(req.params.id));
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await service.createProduct(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  await service.updateProduct(Number(req.params.id), req.body);
  res.json({ success: true });
};

export const deleteProduct = async (req: Request, res: Response) => {
  await service.deleteProduct(Number(req.params.id));
  res.status(204).send();
};
