import { FastifyReply } from "fastify";
import { CreateActivityService } from "@activityServices";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";

export class CreateActivityController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as string;

        const { type, paymentMethod, creditCardId, value, categories, notes, date, bankAccountId } = request.body as {
            type: string, 
            paymentMethod?: string,
            creditCardId?: string,
            value: number, 
            categories: string[], 
            notes?: string,
            date?: Date,
            bankAccountId?: string
        };

        const createActivityService = new CreateActivityService();
        const activity = await createActivityService.execute({
            authorId,
            type,
            paymentMethod,
            creditCardId,
            value,
            categories,
            notes,
            date,
            bankAccountId
        });

        reply.send(activity).code(201);
    
    }
}