import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV !== 'production') {
  const envs = process.env.NODE_ENV === 'ci' ? '../../.env.ci' : '../../.env';
  dotenv.config({ path: path.join(__dirname, envs) });
}
