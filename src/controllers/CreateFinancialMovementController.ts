import { FastifyReply } from "fastify";
import { CreateFinancialMovementService } from "../services/CreateFinancialMovementService";
import { FinancialMovementType, FinancialMovement } from "@prisma/client"
import { AuthenticatedUserRequest } from "../auth/middleware/AuthMiddleware";

export class CreateFinancialMovementController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as FinancialMovement["authorId"];

        const { type, value, categories, notes, date } = request.body as {
            type: FinancialMovementType, 
            value: number, 
            categories: string[], 
            notes?: string,
            date?: Date
        };

        const createFinancialMovementService = new CreateFinancialMovementService();

        const financialMovement = await createFinancialMovementService.handle({
            authorId,
            type,
            value,
            categories,
            notes,
            date
        });

        reply.send(financialMovement)
    
    }
}