import { FastifyReply } from "fastify";
import { UpdateActivityService } from "@activityServices";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";

export class UpdateActivityController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
    
        const authorId = request.user.id as string;

        const { id } = request.params as { id: string };
        const { type, value, categories, notes, date } = request.body as {
            type: string, 
            value: number, 
            categories: string[], 
            notes: string,
            date: Date
        };

        const updateActivityService = new UpdateActivityService();
        const updatedActivity = await updateActivityService.execute({ authorId, id, type, value, categories, notes, date });

        reply.send({message: 'Update was successful.', data: updatedActivity}).code(200);
    }
}