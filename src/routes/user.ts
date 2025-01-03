import useAuthValidation from "@hooks/useAuthValidation";
import { FastifyInstance } from "fastify";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { CreateActivityController, ListActivitiesController, DeleteActivityController, UpdateActivityController } from "@activityControllers";
import { CreateCategoryController, ListCategoriesController, DeleteCategoryController, UpdateCategoryController } from "@categoryControllers";
import { CreateCreditCardController, DeleteCreditCardController, ListCreditCardsController, UpdateCreditCardController } from "@creditCardControllers";
import { CreateBankAccountController, DeleteBankAccountController, ListBankAccountsController, UpdateBankAccountController } from "@bankAccountControllers";
import { CreateActivitySchema, DeleteActivitySchema, ListActivitiesSchema, UpdateActivitySchema } from "src/schemas/Activity";
import { ListBankAccountsSchema, CreateBankAccountSchema, UpdateBankAccountSchema, DeleteBankAccountSchema } from "src/schemas/BankAccount";
import { CreateCategorySchema, DeleteCategorySchema, ListCategoriesSchema, UpdateCategorySchema } from "src/schemas/Category";
import { CreateCreditCardSchema, DeleteCreditCardSchema, UpdateCreditCardSchema, ListCreditCardsSchema } from "src/schemas/CreditCard";

export async function userRoutes(fastify: FastifyInstance) {
    fastify.addHook('preValidation', useAuthValidation)

    // GET

    fastify.get('/finances', { schema: ListActivitiesSchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new ListActivitiesController().handle(request, reply)
    });

    fastify.get('/finances/categories', { schema: ListCategoriesSchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new ListCategoriesController().handle(request, reply);
    });

    fastify.get('/finances/accounts', { schema: ListBankAccountsSchema }, async (request: AuthenticatedUserRequest, reply) => {
        return new ListBankAccountsController().handle(request, reply);
    });

    fastify.get('/finances/cards', { schema: ListCreditCardsSchema }, async (request: AuthenticatedUserRequest, reply) => {
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
