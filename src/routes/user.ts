import { FastifyInstance } from "fastify";
import { CreateActivityController, ListActivitiesController, DeleteActivityController, UpdateActivityController } from "@activityControllers/index";
import { CreateCategoryController, ListCategoriesController, DeleteCategoryController, UpdateCategoryController } from "@categoryControllers/index";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import useAuthValidation from "@hooks/useAuthValidation";
import prismaClient from "@prismaClient";
import { UpdateUserBalanceService } from "src/services/User/UpdateUserBalance";
import useUpdateUserBalance from "@hooks/useUpdateUserBalance";

export async function userRoutes(fastify: FastifyInstance) {
    fastify.addHook('preValidation', useAuthValidation)

    fastify.get('/finances', async (request: AuthenticatedUserRequest, reply) => {
        return new ListActivitiesController().handle(request, reply)
    });

    fastify.get('/finances/categories', async (request: AuthenticatedUserRequest, reply) => {
        return new ListCategoriesController().handle(request, reply);
    });

    fastify.addHook('onResponse', async (request: AuthenticatedUserRequest, reply) => {
        await useUpdateUserBalance(request, reply);
    });

    fastify.post('/finances', async (request: AuthenticatedUserRequest, reply) => {
        return new CreateActivityController().handle(request, reply);
    });

    fastify.put('/finances/:id', async (request: AuthenticatedUserRequest, reply) => {
        return new UpdateActivityController().handle(request, reply);
    });

    fastify.delete('/finances/:id', async (request: AuthenticatedUserRequest, reply) => {
        return new DeleteActivityController().handle(request, reply);
    });

    fastify.post('/finances/categories', async (request: AuthenticatedUserRequest, reply) => {
        return new CreateCategoryController().handle(request, reply);
    });

    fastify.put('/finances/categories/:id', async (request: AuthenticatedUserRequest, reply) => {
        return new UpdateCategoryController().handle(request, reply);
    });

    fastify.delete('/finances/categories/:id', async (request: AuthenticatedUserRequest, reply) => {
        return new DeleteCategoryController().handle(request, reply);
    });
}
