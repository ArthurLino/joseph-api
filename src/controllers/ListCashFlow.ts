import { FastifyReply } from "fastify";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { CashFlowMovement, CashFlowMovementType } from "@prisma/client";
import { ListCashFlowMovementsService } from "@services/ListCashFlow"

export type CashFlowQueryProps = {
    type: CashFlowMovementType;
}

export class ListCashFlowMovementsController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as CashFlowMovement["authorId"];

        const queryParams = request.params ? 
        request.params as CashFlowQueryProps : 
        {} as CashFlowQueryProps;

        if ( queryParams.type && !Object.values(["income", "expense"]).includes(queryParams.type) ) {
            reply.code(400).send({ error: "Invalid type of cashflow movement sent." });
        }

        const { type } = queryParams;

        const listCashFlowMovementsService = new ListCashFlowMovementsService();

        const cashFlowMovementsList = await listCashFlowMovementsService.execute(authorId, {
            type: type.toUpperCase()
        } as CashFlowQueryProps);

        reply.code(200).send(cashFlowMovementsList) 
    }
}