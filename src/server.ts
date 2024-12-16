import Fastify from 'fastify';
import cors from '@fastify/cors';
import { publicRoutes } from './routes/public';
import { userRoutes } from './routes/user'
import { configDotenv } from 'dotenv';
import rateLimit from '@fastify/rate-limit';

configDotenv();

const server = Fastify({ 
    logger: true 
});

const start = async () => {

    await server.register(cors);
    await server.register(rateLimit, {
        max: 100,
        timeWindow: '1 minute'
    });
    await server.register(publicRoutes, { prefix: '/api' });
    await server.register(userRoutes, {
        prefix: '/api/user',
    })

    try {
        await server.listen({port: Number(process.env.PORT)});
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }   
}

start();
