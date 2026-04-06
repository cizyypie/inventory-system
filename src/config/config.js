import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '../../.env') });

export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const database = {
    url: process.env.DATABASE_URL
};