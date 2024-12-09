import prismaClient from "../prisma";

export class ListCashFlowMovementsService {
    async execute(authorId : string) {

        const cashFlowMovementsList = prismaClient.cashFlowMovement.findMany({ where: { authorId: authorId}})

        if ( !cashFlowMovementsList ) throw new Error("You have no financial movement in your cashflow.")
            
        return cashFlowMovementsList

    }
}
