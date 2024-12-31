import prismaClient from "@prismaClient";
import isDateValid from "@utils/isDateValid";
import validateActivityType from "@utils/validateActivityType";
import { CashFlowActivityType } from "@prisma/client";
import { ObjectId } from "mongodb";

type ListActivitiesServiceProps = {
    authorId: string;
    query: ListActivitiesQueryProps;
};

type ListActivitiesQueryProps = {
    type?: string;
    date?: Date;
    from?: Date;
    to?: Date;
    category?: string;
};

export class ListActivitiesService {
    async execute({authorId, query: {type, date, from, to, category}}: ListActivitiesServiceProps) {
        
        if ( !ObjectId.isValid(authorId) ) throw new Error('Missing request data.')

        const filters = {} as ListActivitiesQueryProps

        if ( type && validateActivityType(type) ) filters["type"] = validateActivityType(type) as string;

        if ( date && isDateValid(date) ) filters["date"] = new Date(date)

        if ( from && isDateValid(from) ) filters["from"] = new Date(from)
            
        if ( to && isDateValid(to) ) filters["to"] = new Date(to)

        if ( category ) filters["category"] = category
        
        const cashFlowActivitiesList = prismaClient.cashFlowActivity.findMany({ 
            where: { 
                authorID: authorId,
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
