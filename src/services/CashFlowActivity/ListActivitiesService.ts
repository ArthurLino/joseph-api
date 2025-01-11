import prismaClient from "@prismaClient";
import isDateValid from "src/utils/isDateValid";
import validateActivityType from "src/utils/validateActivityType";
import { CashFlowActivityType } from "@prisma/client";
import { ObjectId } from "mongodb";
import validateNames from "src/utils/validateNames";

type ListActivitiesServiceProps = {
    authorId: string;
    query: ListActivitiesQueryProps;
    params: ListActivityParams;
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

type ListActivityParams = {
    id: string;
};

export type ListActivitiesQueryValues = ListActivitiesQueryProps[keyof ListActivitiesQueryProps];

export class ListActivitiesService {
    async execute({authorId, query, params}: ListActivitiesServiceProps) {
        
        if ( !ObjectId.isValid(authorId) ) throw new Error('Missing request data.');
        
        const accountId = ObjectId.isValid(params.id) && params.id;

        const cashFlowActivitiesList = prismaClient.cashFlowActivity.findMany({ 
            where: { 
                authorID: authorId,
                ...(accountId ? { id: accountId } : {}),
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
