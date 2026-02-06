import { Request, Response } from 'express';
import { pool } from '../../config/database';

export const getCategory = async (_: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        ct.id AS categoryTypeId,
        ct.name AS categoryType,
        c.id AS categoryId,
        c.name AS category
      FROM category_types ct
      LEFT JOIN categories c ON c.categoryTypeId = ct.id
      WHERE ct.isActive = true AND (c.isActive = true OR c.id IS NULL)
      ORDER BY ct.name, c.name
    `);

    const result: any = {};
    (rows as any[]).forEach(r => {
      if (!result[r.categoryType]) {
        result[r.categoryType] = [];
      }
      if (r.category) {
        result[r.categoryType].push({
          id: r.categoryId,
          name: r.category
        });
      }
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load categories' });
  }
};
