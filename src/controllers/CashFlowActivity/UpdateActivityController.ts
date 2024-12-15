import { FastifyReply } from "fastify";
import { UpdateCashFlowMovementService } from "@activityServices/UpdateActivityService";
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
    
        if ( !id ) return reply.code(400).send("Invalid params sent.");

        const updateActivitiesService = await new UpdateCashFlowMovementService().execute({ authorId, id, type, value, categories, notes, date });

        reply.send({message: 'Movement update was successful.', data: updateActivitiesService}).code(202);
    }
}