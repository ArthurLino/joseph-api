import { CashFlowCategory, CashFlowMovementType } from "@prisma/client";
import prismaClient from "../prisma";

type ListCashFlowMovementsQueryProps = {
    type: string;
    date: Date;
    category: string;
}

export class ListCashFlowMovementsService {
    async execute(authorId : string, {type, date, category}: ListCashFlowMovementsQueryProps) {

        const filters = {} as ListCashFlowMovementsQueryProps

        if ( type && (type.toUpperCase() == "INCOME" || type.toUpperCase() == "EXPENSE") ) filters["type"] = (type.toUpperCase() as CashFlowMovementType)

        if ( date && !isNaN(new Date(date).getTime())) filters["date"] = new Date(date)

        if ( category ) filters["category"] = category

        const cashFlowMovementsList = prismaClient.cashFlowMovement.findMany({ 
            where: { 
                authorId: authorId,
                type: {
                    equals: filters.type as CashFlowMovementType
                },
                date: {
                    // equals: filters.date
                    gte: filters.date
                    // lte: filters.date
                },
                categories: {
                    some: {
                        name: filters.category
                    }
                }
            },
        })

        if ( !cashFlowMovementsList ) throw new Error("You have no financial movement in your cashflow.")
            
        return cashFlowMovementsList

    }
}
