import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables from a .env file if necessary
config();

const isProduction =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.{js, ts}'],
  synchronize: false,
  ...(isProduction
    ? {
        ssl: true,
      }
    : {}),
};

export default databaseConfig;
