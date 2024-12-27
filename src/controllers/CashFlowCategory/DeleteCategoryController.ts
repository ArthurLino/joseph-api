import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { DeleteCategoryService } from "@categoryServices";
import { FastifyReply } from "fastify";

export class DeleteCategoryController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        const authorId = request.user.id as string;
        
        const { id } = request.params as { id: string };

        if ( !id ) return reply.send("Invalid params sent.").code(400);

        const deletedCategory = await new DeleteCategoryService().execute({ authorId, id });

        reply.send({message: 'Object deleted.', data: deletedCategory}).code(200);

    }
}