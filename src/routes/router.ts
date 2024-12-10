import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { AuthController } from "../auth/AuthController";
import { AuthenticatedUserRequest, AuthMiddleware } from "../auth/middleware/AuthMiddleware";
import { CreateCashFlowMovementController } from "../controllers/CreateCashFlowMovement";
import { ListCashFlowMovementsController } from "../controllers/ListCashFlow";
import { CreateCashFlowCategoryController } from "../controllers/CreateCashFlowCategory";
import { authOptions } from "./options";

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

    fastify.post('/finances', authOptions, async (request: AuthenticatedUserRequest, reply) => {
        return new CreateCashFlowMovementController().handle(request, reply);
    });

    fastify.get('/finances', authOptions, async (request: AuthenticatedUserRequest, reply) => {
        return new ListCashFlowMovementsController().handle(request, reply)
    });

    fastify.post('/finances/categories', authOptions, async (request: AuthenticatedUserRequest, reply) => {
        return new CreateCashFlowCategoryController().handle(request, reply);
    });

    fastify.get('/finances/categories', authOptions, async (request: AuthenticatedUserRequest, reply) => {
        // return new CreateCashFlowCategoryController().handle(request, reply);
    });
}

export default router;