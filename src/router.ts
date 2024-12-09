import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { AuthController } from "./auth/AuthController";
import { AuthenticatedUserRequest, AuthMiddleware } from "./auth/middleware/AuthMiddleware";
import { CreateCashFlowMovementController } from "./controllers/CreateCashFlowMovement";
import { ListCashFlowMovementsController } from "./controllers/ListCashFlow";

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

    fastify.post('/finances', { preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
        await AuthMiddleware(request, reply)
    }}, async (request: AuthenticatedUserRequest, reply) => {
        return new CreateCashFlowMovementController().handle(request, reply);
    });

    fastify.get('/finances', {preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
        await AuthMiddleware(request, reply)
    }}, async (request: AuthenticatedUserRequest, reply) => {
        return new ListCashFlowMovementsController().handle(request, reply)
    });
}

export default router;