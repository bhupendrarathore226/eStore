import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { initDatabase } from './config/database';

const PORT = process.env.PORT || 3000;

(async () => {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`  Server running on http://localhost:${PORT}`);
  });
})();
