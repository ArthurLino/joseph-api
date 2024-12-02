import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateFinancialMovementController } from "./controllers/CreateFinancialMovementController";

export async function router(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        return { message: 'hello world!' };
    });

    fastify.post('/user/create', async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply);
    });

    fastify.post('/user/:authorId/finances/create', async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateFinancialMovementController().handle(request, reply);
    });
}

export default router;