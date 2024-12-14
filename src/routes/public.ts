import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { AuthController } from "@auth/AuthController";

export async function publicRoutes(fastify: FastifyInstance) {
    fastify.get('/', async () => {
        return { message: 'Hello World!' };
    });

    fastify.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
        return new AuthController().handleSignUp(request, reply);
    });

    fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        return new AuthController().handleLogin(request, reply);
    });
}