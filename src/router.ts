import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { AuthController } from "./auth/AuthController";
import { AuthenticatedUserRequest, AuthMiddleware } from "./auth/middleware/AuthMiddleware";
import { CreateFinancialMovementController } from "./controllers/CreateFinancialMovementController";

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

    fastify.post('/finances', { preHandler: (request: FastifyRequest, reply: FastifyReply, done) => {
        AuthMiddleware(request, reply)
        done()
    }}, async (request: AuthenticatedUserRequest, reply: FastifyReply) => {
        return new CreateFinancialMovementController().handle(request, reply);
    });
}

export default router;