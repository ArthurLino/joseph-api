import { FastifyReply } from "fastify";
import { CreateActivityService } from "@activityServices/index";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";

export class CreateActivityController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as string;

        const { type, value, categories, notes, date } = request.body as {
            type: string, 
            value: number, 
            categories: string[], 
            notes?: string,
            date?: Date
        };

        const createActivityService = new CreateActivityService();

        const transaction = await createActivityService.execute({
            authorId,
            type,
            value,
            categories,
            notes,
            date
        });

        reply.send(transaction).code(201);
    
    }
}