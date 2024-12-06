import { FastifyReply } from "fastify";
import { AuthenticatedUserRequest } from "../auth/middleware/AuthMiddleware";
import { FinancialMovement } from "@prisma/client";
import { ListFinancialMovementsService } from "../services/ListFinancialMovementsService"

export class ListFinancialMovementsController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as FinancialMovement["authorId"];

        const listFinancialMovementsService = new ListFinancialMovementsService();

        const financialMovementsList = await listFinancialMovementsService.execute(authorId);

        reply.code(200).send(financialMovementsList) 
    }
}