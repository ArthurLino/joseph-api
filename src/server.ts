import Fastify from 'fastify';
import cors from '@fastify/cors';
import router from './router';

const app = Fastify({ 
    logger: true 
});

const start = async () => {

    await app.register(router, { prefix: '/api' });
    await app.register(cors);

    try {
        await app.listen({port: 8080})
    }
    catch (err) {
        process.exit(1)
    }   
}

start();
