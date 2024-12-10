import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { AuthenticatedUserRequest, AuthValidation } from "@auth/AuthValidation";
import { CreateCashFlowMovementController } from "@controllers/CreateCashFlowMovement";
import { ListCashFlowMovementsController } from "@controllers/ListCashFlow";
import { CreateCashFlowCategoryController } from "@controllers/CreateCashFlowCategory";
import authHook from "@hooks/authHook";

export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.addHook('preValidation', authHook)

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
