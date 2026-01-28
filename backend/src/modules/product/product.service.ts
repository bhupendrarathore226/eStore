import * as repo from './product.repository';

export const getAllProducts = () => repo.findAll();

export const getProductById = async (id: number) => {
  const product = await repo.findById(id);
  if (!product) {
    const err: any = new Error('Product not found');
    err.statusCode = 404;
    throw err;
  }
  return product;
};

export const createProduct = (data: any) => repo.create(data);

export const updateProduct = (id: number, data: any) =>
  repo.update(id, data);

export const deleteProduct = (id: number) => repo.remove(id);
