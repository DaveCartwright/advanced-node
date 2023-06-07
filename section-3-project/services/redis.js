import { createClient } from 'redis';

const redis = createClient('http://localhost:6379');

redis.on('error', () => console.log);

module.exports.redis = redis;
