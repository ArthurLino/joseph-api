import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "./controllers/createUserController";

export async function router(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        return { message: 'hello world!' };
    });

    fastify.post('/user/create', async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply);
    });
}

export default router;