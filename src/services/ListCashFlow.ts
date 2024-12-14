import { CashFlowCategory, CashFlowMovementType } from "@prisma/client";
import prismaClient from "../prisma";

type ListCashFlowMovementsQueryProps = {
    type: string;
    date: Date;
    from: Date;
    to: Date;
    category: string;
}

export class ListCashFlowMovementsService {
    async execute(authorId : string, {type, date, from, to, category}: ListCashFlowMovementsQueryProps) {

        const filters = {} as ListCashFlowMovementsQueryProps

        if ( type && (type.toUpperCase() == "INCOME" || type.toUpperCase() == "EXPENSE") ) filters["type"] = type.toUpperCase()

        if ( date && !isNaN(new Date(date).getTime())) filters["date"] = new Date(date)

        if ( from && !isNaN(new Date(from).getTime())) filters["from"] = new Date(from)
            
        if ( to && !isNaN(new Date(to).getTime())) filters["to"] = new Date(to)

        if ( category ) filters["category"] = category
        
        const cashFlowMovementsList = prismaClient.cashFlowMovement.findMany({ 
            where: { 
                authorId: authorId,
                type: {
                    equals: filters.type as CashFlowMovementType
                },
                date: {
                    equals: filters.date,
                    gte: filters.from,
                    lte: filters.to,
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
