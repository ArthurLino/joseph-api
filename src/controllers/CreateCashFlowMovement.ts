import { FastifyReply } from "fastify";
import { CreateCashFlowMovementService } from "@services/CreateCashFlowMovement";
import { CashFlowMovementType, CashFlowMovement } from "@prisma/client"
import { AuthenticatedUserRequest } from "@auth/AuthValidation";

export class CreateCashFlowMovementController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as CashFlowMovement["authorId"];

        const { type, value, categories, notes, date } = request.body as {
            type: CashFlowMovementType, 
            value: number, 
            categories: string[], 
            notes?: string,
            date?: Date
        };

        const createCashFlowMovementService = new CreateCashFlowMovementService();

        const cashFlowMovement = await createCashFlowMovementService.execute({
            authorId,
            type,
            value,
            categories,
            notes,
            date
        });

        reply.code(201).send(cashFlowMovement)
    
    }
}