import { FastifyInstance, FastifyReply } from "fastify";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { AuthController } from "@auth/AuthController";
import { authValidationHandler } from "@handlers/AuthValidationHandler";
import { queryFilteringHandler } from "@handlers/QueryFilteringHandler";
import { CreateActivityController, ListActivitiesController, DeleteActivityController, UpdateActivityController } from "@activityControllers";
import { CreateCategoryController, ListCategoriesController, DeleteCategoryController, UpdateCategoryController } from "@categoryControllers";
import { CreateCreditCardController, DeleteCreditCardController, ListCreditCardsController, UpdateCreditCardController } from "@creditCardControllers";
import { CreateBankAccountController, DeleteBankAccountController, ListBankAccountsController, UpdateBankAccountController } from "@bankAccountControllers";
import { CreateActivitySchema, DeleteActivitySchema, ListActivitiesSchema, ListActivitySchema, UpdateActivitySchema } from "@schemas/Activity";
import { CreateCategorySchema, DeleteCategorySchema, ListCategoriesSchema, ListCategorySchema, UpdateCategorySchema } from "@schemas/Category";
import { CreateCreditCardSchema, DeleteCreditCardSchema, UpdateCreditCardSchema, ListCreditCardsSchema, ListCreditCardSchema } from "@schemas/CreditCard";
import { ListBankAccountsSchema, CreateBankAccountSchema, UpdateBankAccountSchema, DeleteBankAccountSchema, ListBankAccountSchema } from "@schemas/BankAccount";

export async function userRoutes(fastify: FastifyInstance) {
    fastify.addHook('preValidation', authValidationHandler)

    fastify.get('/me', async (request: AuthenticatedUserRequest, reply) => {
        return reply.send({
            user: {
                id: request.user.id,
                name: request.user.name,
                email: request.user.email
            }
        });
    });
    
    fastify.post('/signout', async (request: AuthenticatedUserRequest, reply: FastifyReply) => {
        return new AuthController().handleLogout(request, reply);
    });

    // GET

    fastify.get('/finances', { schema: ListActivitiesSchema, preHandler: queryFilteringHandler }, async (request: AuthenticatedUserRequest, reply) => {
        return new ListActivitiesController().handle(request, reply)
    });

    fastify.get('/finances/:id', { schema: ListActivitySchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new ListActivitiesController().handle(request, reply)
    });

    fastify.get('/finances/categories', { schema: ListCategoriesSchema, preHandler: queryFilteringHandler }, async (request: AuthenticatedUserRequest, reply) => {
        return new ListCategoriesController().handle(request, reply);
    });

    fastify.get('/finances/categories/:id', { schema: ListCategorySchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new ListCategoriesController().handle(request, reply);
    });

    fastify.get('/finances/accounts', { schema: ListBankAccountsSchema, preHandler: queryFilteringHandler }, async (request: AuthenticatedUserRequest, reply) => {
        return new ListBankAccountsController().handle(request, reply);
    });

    fastify.get('/finances/accounts/:id', { schema: ListBankAccountSchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new ListBankAccountsController().handle(request, reply);
    });

    fastify.get('/finances/cards', { schema: ListCreditCardsSchema, preHandler: queryFilteringHandler }, async (request: AuthenticatedUserRequest, reply) => {
        return new ListCreditCardsController().handle(request, reply);
    });

    fastify.get('/finances/cards/:id', { schema: ListCreditCardSchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new ListCreditCardsController().handle(request, reply);
    });
    
    // POST

    fastify.post('/finances', { schema: CreateActivitySchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new CreateActivityController().handle(request, reply);
    });

    fastify.post('/finances/categories', { schema: CreateCategorySchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new CreateCategoryController().handle(request, reply);
    });

    fastify.post('/finances/accounts', { schema: CreateBankAccountSchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new CreateBankAccountController().handle(request, reply);
    });

    fastify.post('/finances/cards', {schema: CreateCreditCardSchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new CreateCreditCardController().handle(request, reply);
    });

    // PUT

    fastify.put('/finances/:id', { schema: UpdateActivitySchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new UpdateActivityController().handle(request, reply);
    });

    fastify.put('/finances/categories/:id', { schema: UpdateCategorySchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new UpdateCategoryController().handle(request, reply);
    });

    fastify.put('/finances/accounts/:id', {schema: UpdateBankAccountSchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new UpdateBankAccountController().handle(request, reply);
    });

    fastify.put('/finances/cards/:id', { schema: UpdateCreditCardSchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new UpdateCreditCardController().handle(request, reply);
    });
    
    // DELETE
    
    fastify.delete('/finances/:id', { schema: DeleteActivitySchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new DeleteActivityController().handle(request, reply);
    });

    fastify.delete('/finances/categories/:id', { schema: DeleteCategorySchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new DeleteCategoryController().handle(request, reply);
    });

    fastify.delete('/finances/accounts/:id', { schema: DeleteBankAccountSchema } , async (request: AuthenticatedUserRequest, reply) => {
        return new DeleteBankAccountController().handle(request, reply);
    });

    fastify.delete('/finances/cards/:id', { schema: DeleteCreditCardSchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new DeleteCreditCardController().handle(request, reply);
    });
}
