import { FastifyRequest, FastifyReply } from "fastify";
import { CreateFinancialMovementService } from "../services/CreateFinancialMovementService";
import { FinancialMovementType, FinancialMovement } from "@prisma/client"

export class CreateFinancialMovementController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        
        const { authorId } = request.params as { authorId: FinancialMovement["authorId"] };

        const { type, value, categories, notes } = request.body as {
            type: FinancialMovementType, 
            value: number, 
            categories: string[], 
            notes?: string
        };

        console.log(request.params)
        console.log({authorId, type, value, categories, notes})

        const createFinancialMovementService = new CreateFinancialMovementService();

        const financialMovement = await createFinancialMovementService.handle({
            authorId,
            type,
            value,
            categories,
            notes,
        });

        reply.send(financialMovement)
    
    }
}