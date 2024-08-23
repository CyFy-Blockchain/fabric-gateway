import { DataSource } from 'typeorm';
import databaseConfig from './ormconfig';

export const dataSource = new DataSource(databaseConfig);
