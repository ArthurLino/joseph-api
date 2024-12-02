import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserService } from '../services/createUserService';

export class CreateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, email } = request.body as {name: string, email: string};
        console.log(name)
        console.log(email)

        const userService = new CreateUserService();

        const user = await userService.handle({name, email} as {name: string, email: string});

        reply.send(user);
    }
}