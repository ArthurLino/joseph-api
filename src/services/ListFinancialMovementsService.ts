import prismaClient from "../prisma";

export class ListFinancialMovementsService {
    async execute(authorId : string) {

        const financialMovementsList = prismaClient.financialMovement.findMany({ where: { authorId: authorId}})

        if ( !financialMovementsList ) throw new Error("You have no financial movement in your cashflow.")
            
        return financialMovementsList

    }
}
