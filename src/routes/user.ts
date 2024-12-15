import { FastifyInstance } from "fastify";
import { CreateActivityController } from "@activityControllers/CreateActivityController";
import { ListActivitiesController } from "@activityControllers/ListActivitiesController";
import { DeleteActivityController } from "@activityControllers/DeleteActivityController";
import { UpdateActivitiesController } from "@activityControllers/UpdateActivityController";
import { CreateCategoryController } from "@categoryControllers/CreateCategoryController";
import { ListCategoriesController } from "@categoryControllers/ListCategoriesController";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import authHook from "@hooks/authHook";

export async function userRoutes(fastify: FastifyInstance) {
    fastify.addHook('preValidation', authHook)

    fastify.post('/finances', async (request: AuthenticatedUserRequest, reply) => {
        return new CreateActivityController().handle(request, reply);
    });

    fastify.get('/finances', async (request: AuthenticatedUserRequest, reply) => {
        return new ListActivitiesController().handle(request, reply)
    });

    fastify.delete('/finances/:id', async (request: AuthenticatedUserRequest, reply) => {
        return new DeleteActivityController().handle(request, reply);
    });

    fastify.put('/finances/:id', async (request: AuthenticatedUserRequest, reply) => {
        return new UpdateActivitiesController().handle(request, reply);
    });

    fastify.post('/finances/categories', async (request: AuthenticatedUserRequest, reply) => {
        return new CreateCategoryController().handle(request, reply);
    });

    fastify.get('/finances/categories', async (request: AuthenticatedUserRequest, reply) => {
        return new ListCategoriesController().handle(request, reply);
    });
}
