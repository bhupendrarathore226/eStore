/**
 * EXAMPLE: Backend API Routes for Product Service (Node.js/Express)
 * This file demonstrates how to set up the backend API to fetch products from MySQL
 * 
 * Installation:
 * npm install mysql2 express cors dotenv
 * npm install -D @types/express @types/node
 */

import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '4513',
  database: process.env.DB_NAME || 'estore',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * GET /api/products - Fetch all products
 */
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT id, name, description, price, category, imageUrl, rating FROM products'
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/**
 * GET /api/products/:id - Fetch a single product by ID
 */
app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT id, name, description, price, category, imageUrl, rating FROM products WHERE id = ?',
      [id]
    );
    connection.release();
    
    if ((rows as any[]).length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json((rows as any[])[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

/**
 * GET /api/products/category/:category - Fetch products by category
 */
app.get('/api/products/category/:category', async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT id, name, description, price, category, imageUrl, rating FROM products WHERE category = ?',
      [category]
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/**
 * POST /api/products - Create a new product
 */
app.post('/api/products', async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, imageUrl, rating } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO products (name, description, price, category, imageUrl, rating) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, category, imageUrl, rating]
    );
    connection.release();
    
    res.status(201).json({
      id: (result as any).insertId,
      name,
      description,
      price,
      category,
      imageUrl,
      rating,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

/**
 * PUT /api/products/:id - Update a product
 */
app.put('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, imageUrl, rating } = req.body;
    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE products SET name = ?, description = ?, price = ?, category = ?, imageUrl = ?, rating = ? WHERE id = ?',
      [name, description, price, category, imageUrl, rating, id]
    );
    connection.release();
    
    res.json({ id: parseInt(id as string), name, description, price, category, imageUrl, rating });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

/**
 * DELETE /api/products/:id - Delete a product
 */
app.delete('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    await connection.query('DELETE FROM products WHERE id = ?', [id]);
    connection.release();
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// MySQL Database Schema
const DATABASE_SCHEMA = `
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  imageUrl VARCHAR(255),
  rating DECIMAL(3, 2),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

// Initialize database
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    await connection.query(DATABASE_SCHEMA);
    connection.release();
    console.log('Database schema initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await initializeDatabase();
});
