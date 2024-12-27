import useAuthValidation from "@hooks/useAuthValidation";
import { FastifyInstance } from "fastify";
import { CreateActivityController, ListActivitiesController, DeleteActivityController, UpdateActivityController } from "@activityControllers";
import { CreateCategoryController, ListCategoriesController, DeleteCategoryController, UpdateCategoryController } from "@categoryControllers";
import { CreateBankAccountController, DeleteBankAccountController, ListBankAccountsController, UpdateBankAccountController } from "@bankAccountControllers";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";

export async function userRoutes(fastify: FastifyInstance) {
    fastify.addHook('preValidation', useAuthValidation)

    fastify.get('/finances', async (request: AuthenticatedUserRequest, reply) => {
        return new ListActivitiesController().handle(request, reply)
    });

    fastify.get('/finances/categories', async (request: AuthenticatedUserRequest, reply) => {
        return new ListCategoriesController().handle(request, reply);
    });

    fastify.get('/finances/accounts', async (request: AuthenticatedUserRequest, reply) => {
        return new ListBankAccountsController().handle(request, reply);
    });

    fastify.post('/finances', async (request: AuthenticatedUserRequest, reply) => {
        return new CreateActivityController().handle(request, reply);
    });

    fastify.post('/finances/categories', async (request: AuthenticatedUserRequest, reply) => {
        return new CreateCategoryController().handle(request, reply);
    });

    fastify.post('/finances/accounts', async (request: AuthenticatedUserRequest, reply) => {
        return new CreateBankAccountController().handle(request, reply);
    });

    fastify.put('/finances/:id', async (request: AuthenticatedUserRequest, reply) => {
        return new UpdateActivityController().handle(request, reply);
    });

    fastify.put('/finances/categories/:id', async (request: AuthenticatedUserRequest, reply) => {
        return new UpdateCategoryController().handle(request, reply);
    });

    fastify.put('/finances/accounts/:id', async (request: AuthenticatedUserRequest, reply) => {
        return new UpdateBankAccountController().handle(request, reply);
    });

    fastify.delete('/finances/:id', async (request: AuthenticatedUserRequest, reply) => {
        return new DeleteActivityController().handle(request, reply);
    });

    fastify.delete('/finances/categories/:id', async (request: AuthenticatedUserRequest, reply) => {
        return new DeleteCategoryController().handle(request, reply);
    });

    fastify.delete('/finances/accounts/:id', async (request: AuthenticatedUserRequest, reply) => {
        return new DeleteBankAccountController().handle(request, reply);
    });
}
