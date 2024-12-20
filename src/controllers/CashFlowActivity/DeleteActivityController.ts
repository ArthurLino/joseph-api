import { FastifyReply } from "fastify"
import { DeleteActivityService } from "@activityServices/index";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
;

export class DeleteActivityController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
    
        const authorId = request.user.id as string;

        const { id } = request.params as { id: string };
    
        if ( !id ) return reply.send("Invalid params sent.").code(400);

        const deleteActivityService = await new DeleteActivityService().execute({ authorId, id });

        reply.send({message: 'Object deleted.', data: deleteActivityService}).code(200);
    }
}