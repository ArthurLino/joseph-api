import prismaClient from "@prismaClient";
import isDateValid from "src/utils/isDateValid";
import validateActivityType from "src/utils/validateActivityType";
import { CashFlowActivityType } from "@prisma/client";
import { ObjectId } from "mongodb";
import validateNames from "src/utils/validateNames";

type ListActivitiesServiceProps = {
    authorId: string;
    query: ListActivitiesQueryProps;
};

type ListActivitiesQueryProps = {
    type?: string;
    date?: Date;
    from?: Date;
    to?: Date;
    categories?: string[];
    skip?: number;
    take?: number;
};

export class ListActivitiesService {
    async execute({authorId, query}: ListActivitiesServiceProps) {
        
        if ( !ObjectId.isValid(authorId) ) throw new Error('Missing request data.');
        
        const cashFlowActivitiesList = prismaClient.cashFlowActivity.findMany({ 
            where: { 
                authorID: authorId,
                type: {
                    equals: query.type as CashFlowActivityType
                },
                date: {
                    equals: query.date,
                    gte: query.from,
                    lte: query.to,
                },
                AND: query.categories && query.categories.map((category: string) => ({
                    categories: {
                        some: {
                            name: category
                        }
                    }
                })),
                categories: {
                    some: {
                        name: query.categories ? query.categories[0] : undefined
                    }
                }
            },
            skip: query.skip,
            take: query.take,
        });
            
        return cashFlowActivitiesList;

    }
}
