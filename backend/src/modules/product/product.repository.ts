import { pool } from '../../config/database';

export const findAll = async () => {
  const [rows] = await pool.query(
    'SELECT id, name, description, price, category, imageUrl, rating FROM estore.product_list_items'
  );
  return rows;
};

export const findById = async (id: number) => {
  const [rows]: any = await pool.query(
    'SELECT * FROM estore.product_list_items WHERE id = ?',
    [id]
  );
  return rows[0];
};

export const create = async (data: any) => {
  const { name, description, price, category, imageUrl, rating } = data;
  const [result]: any = await pool.query(
    `INSERT INTO estore.product_list_items 
     (name, description, price, category, imageUrl, rating)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, price, category, imageUrl, rating]
  );
  return { id: result.insertId, ...data };
};

export const update = async (id: number, data: any) => {
  const { name, description, price, category, imageUrl, rating } = data;
  await pool.query(
    `UPDATE estore.product_list_items
     SET name=?, description=?, price=?, category=?, imageUrl=?, rating=?
     WHERE id=?`,
    [name, description, price, category, imageUrl, rating, id]
  );
};

export const remove = async (id: number) => {
  await pool.query(
    'DELETE FROM estore.product_list_items WHERE id=?',
    [id]
  );
};
