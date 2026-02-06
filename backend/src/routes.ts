import { Router } from 'express';
import productRoutes from './modules/product/product.routes';
import categoryRoutes from './modules/category/category.routes';
const router = Router();

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
export default router;
