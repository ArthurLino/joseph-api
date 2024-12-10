import Fastify from 'fastify';
import cors from '@fastify/cors';
import { publicRoutes } from './routes/public';
import { userRoutes } from './routes/user'

const server = Fastify({ 
    logger: true 
});

const start = async () => {

    await server.register(cors);
    await server.register(publicRoutes, { prefix: '/api' });
    await server.register(userRoutes, {
        prefix: '/api/user',
    })

    try {
        await server.listen({port: 8080})
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }   
}

start();
