import { FastifyReply } from "fastify";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { CashFlowMovement, CashFlowMovementType } from "@prisma/client";
import { ListCashFlowMovementsService } from "@services/ListCashFlow"

export type RouteQueryProps = {
    type: CashFlowMovementType;
    date: Date;
}

export class ListCashFlowMovementsController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as CashFlowMovement["authorId"];
        
        const listCashFlowMovementsService = new ListCashFlowMovementsService();

        if ( request.query && Object.values(request.query).length == 0 ) {
            reply.code(200).send(await listCashFlowMovementsService.execute(authorId))
        }

        const query = {} as RouteQueryProps;

        const { type, date } = request.query ? request.query as RouteQueryProps : {} as RouteQueryProps;

        if ( type && Object.values(CashFlowMovementType).includes(type.toUpperCase() as CashFlowMovementType)) { 
            query.type = type.toUpperCase() as CashFlowMovementType;
        } else return reply.callNotFound();
        
        const cashFlowMovementsList = await listCashFlowMovementsService.execute(authorId, query);        

        reply.code(200).send(cashFlowMovementsList) 
    }
}