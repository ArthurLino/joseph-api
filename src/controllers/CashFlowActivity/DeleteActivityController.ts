import { FastifyReply } from "fastify"
import { DeleteActivityService } from "@activityServices";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
;

export class DeleteActivityController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
    
        const authorId = request.user.id as string;

        const { id } = request.params as { id: string };

        const deleteActivityService = new DeleteActivityService();
        const deletedActivity = await deleteActivityService.execute({ authorId, id });

        reply.send({message: 'Object deleted.', data: deletedActivity}).code(200);
    }
}