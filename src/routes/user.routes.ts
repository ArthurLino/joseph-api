import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions } from "fastify";
import { AuthenticatedUserRequest, AuthMiddleware } from "../auth/AuthMiddleware";
import { CreateCashFlowMovementController } from "../controllers/CreateCashFlowMovement";
import { ListCashFlowMovementsController } from "../controllers/ListCashFlow";
import { CreateCashFlowCategoryController } from "../controllers/CreateCashFlowCategory";

export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
        await AuthMiddleware(request, reply)
    })

    fastify.post('/finances', async (request: AuthenticatedUserRequest, reply) => {
        return new CreateCashFlowMovementController().handle(request, reply);
    });

    fastify.get('/finances', async (request: AuthenticatedUserRequest, reply) => {
        return new ListCashFlowMovementsController().handle(request, reply)
    });

    fastify.post('/finances/categories', async (request: AuthenticatedUserRequest, reply) => {
        return new CreateCashFlowCategoryController().handle(request, reply);
    });

    fastify.get('/finances/categories', async (request: AuthenticatedUserRequest, reply) => {
        // return new CreateCashFlowCategoryController().handle(request, reply);
    });
}
