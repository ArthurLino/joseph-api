import Fastify from 'fastify';
import cors from '@fastify/cors';
import { publicRoutes } from './routes/public.routes';
import { userRoutes } from './routes/user.routes'

const app = Fastify({ 
    logger: true 
});

const start = async () => {

    await app.register(cors);
    await app.register(publicRoutes, { prefix: '/api' });
    await app.register(userRoutes, {
        prefix: '/api/user',
    })

    try {
        await app.listen({port: 8080})
    }
    catch (err) {
        process.exit(1)
    }   
}

start();
