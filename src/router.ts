import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateFinancialMovementController } from "./controllers/CreateFinancialMovementController";
import { AuthController } from "./auth/AuthController";
import { AuthMiddleware } from "./auth/middleware/AuthMiddleware";

export async function router(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        return { message: 'Hello World!' };
    });

    fastify.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
        return new AuthController().handleSignUp(request, reply);
    });

    fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        return new AuthController().handleLogin(request, reply);
    });

    fastify.get('/user', { preHandler: (request: FastifyRequest, reply: FastifyReply, done) => {
        AuthMiddleware(request, reply)
        done()
    }}, async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'hello world! logged' };
    });

    // fastify.post('/user/:authorId/finances/create', async (request: FastifyRequest, reply: FastifyReply) => {
    //     return new CreateFinancialMovementController().handle(request, reply);
    // });
}

export default router;