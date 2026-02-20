import { Request, Response } from 'express';
import { pool } from '../../config/database';
 export const findAll = async (_: Request, res: Response) => {
  try {

    const [rows] = await pool.query(`
      SELECT 
        ct.id AS categoryTypeId,
        ct.name AS categoryType,
        c.id AS categoryId,
        c.name AS category
      FROM category_types ct
      LEFT JOIN categories c ON c.categoryTypeId = ct.id
      WHERE ct.isActive = true 
        AND (c.isActive = true OR c.id IS NULL)
      ORDER BY ct.name, c.name
    `);

    const result = (rows as any[]).reduce((acc: any[], r) => {

      let type = acc.find(t => t.categoryTypeId === r.categoryTypeId);

      if (!type) {
        type = {
          categoryTypeId: r.categoryTypeId,
          categoryType: r.categoryType,
          categories: []
        };
        acc.push(type);
      }

      if (r.category) {
        type.categories.push({
          categoryId: r.categoryId,
          category: r.category
        });
      }

      return acc;

    }, []);

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load categories' });
  }
};