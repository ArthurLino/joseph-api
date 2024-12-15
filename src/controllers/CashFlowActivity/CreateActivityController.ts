import { FastifyReply } from "fastify";
import { CashFlowActivity } from "@prisma/client"
import { CreateCashFlowActivityService } from "@activityServices/CreateActivityService";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";

export class CreateActivityController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as CashFlowActivity["authorID"];

        const { type, value, categories, notes, date } = request.body as {
            type: string, 
            value: number, 
            categories: string[], 
            notes?: string,
            date?: Date
        };

        const createActivityService = new CreateCashFlowActivityService();

        const transaction = await createActivityService.execute({
            authorId,
            type,
            value,
            categories,
            notes,
            date
        });

        reply.code(201).send(transaction)
    
    }
}