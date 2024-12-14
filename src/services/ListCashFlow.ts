import prismaClient from "../prisma";
import { RouteQueryProps } from "@controllers/ListCashFlow";

export class ListCashFlowMovementsService {
    async execute(authorId : string, query?: RouteQueryProps) {

        const cashFlowMovementsList = prismaClient.cashFlowMovement.findMany({ 
            where: { 
                authorId: authorId,
                ...query
            }
        })

        if ( !cashFlowMovementsList ) throw new Error("You have no financial movement in your cashflow.")
            
        return cashFlowMovementsList

    }
}
