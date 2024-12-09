import { FastifyReply } from "fastify";
import { AuthenticatedUserRequest } from "../auth/middleware/AuthMiddleware";
import { CashFlowMovement } from "@prisma/client";
import { ListCashFlowMovementsService } from "../services/ListCashFlow"

export class ListCashFlowMovementsController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as CashFlowMovement["authorId"];

        const listCashFlowMovementsService = new ListCashFlowMovementsService();

        const cashFlowMovementsList = await listCashFlowMovementsService.execute(authorId);

        reply.code(200).send(cashFlowMovementsList) 
    }
}