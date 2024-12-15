import { CashFlowActivityType } from "@prisma/client";
import prismaClient from "../prisma";

type ListCashFlowActivitiesQueryProps = {
    type: string;
    date: Date;
    from: Date;
    to: Date;
    category: string;
}

export class ListCashFlowActivitiesService {
    async execute(authorId : string, {type, date, from, to, category}: ListCashFlowActivitiesQueryProps) {
        
        if ( !authorId ) throw new Error('Missing request data.')

        const filters = {} as ListCashFlowActivitiesQueryProps

        if ( type && (type.toUpperCase() == "INCOME" || type.toUpperCase() == "EXPENSE") ) filters["type"] = type.toUpperCase()

        if ( date && !isNaN(new Date(date).getTime())) filters["date"] = new Date(date)

        if ( from && !isNaN(new Date(from).getTime())) filters["from"] = new Date(from)
            
        if ( to && !isNaN(new Date(to).getTime())) filters["to"] = new Date(to)

        if ( category ) filters["category"] = category
        
        const cashFlowActivitiesList = prismaClient.cashFlowActivity.findMany({ 
            where: { 
                authorId: authorId,
                type: {
                    equals: filters.type as CashFlowActivityType
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

        if ( !cashFlowActivitiesList ) throw new Error("You have no financial movement in your cashflow.");
            
        return cashFlowActivitiesList;

    }
}
