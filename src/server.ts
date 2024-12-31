import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import Ajv from 'ajv';
import fastUri from 'fast-uri';
import { publicRoutes } from './routes/public';
import { userRoutes } from './routes/user'
import { configDotenv } from 'dotenv';

configDotenv();

const ajv = new Ajv({
    coerceTypes: false,
    useDefaults: false,
    removeAdditional: true,
    uriResolver: fastUri,
    addUsedSchema: false,
    allErrors: false,
})

const server = Fastify({ 
    logger: true,

});


const start = async () => {

    server.setValidatorCompiler(({ schema }) => ajv.compile(schema));
    await server.register(cors);
    await server.register(rateLimit, {
        max: 100,
        timeWindow: '1 minute'
    });
    await server.register(publicRoutes, { prefix: '/api/v1' });
    await server.register(userRoutes, {
        prefix: '/api/v1/user',
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
