import Fastify, { FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import Ajv from 'ajv';
import fastUri from 'fast-uri';
import { publicRoutes } from './routes/public';
import { userRoutes } from './routes/user'
import { configDotenv } from 'dotenv';
import { request } from 'http';

configDotenv();

const ajv = new Ajv({
    coerceTypes: true,
    useDefaults: false,
    removeAdditional: false,
    uriResolver: fastUri,
    addUsedSchema: false,
    allErrors: false,
})

const server = Fastify({ 
    logger: true,
});


const start = async () => {

    server.setValidatorCompiler(({ schema }) => ajv.compile(schema));
    await server.register(fastifyCookie);
    await server.register(cors, {
        delegator: (request: FastifyRequest, callback) => {

            const corsOptions = {
                origin: true,
                credentials: true,
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type']
            }

            if ( !request.headers.origin ) corsOptions.origin = false;

            corsOptions.origin = true;

            callback(null, corsOptions);
        }
    });
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
