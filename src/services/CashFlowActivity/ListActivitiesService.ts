import prismaClient from "@prismaClient";
import isDateValid from "@utils/isDateValid";
import validateActivityType from "@utils/validateActivityType";
import { CashFlowActivityType } from "@prisma/client";
import { ObjectId } from "mongodb";
import validateNames from "@utils/validateNames";

type ListActivitiesServiceProps = {
    authorId: string;
    query: ListActivitiesQueryProps;
};

type ListActivitiesQueryProps = {
    type?: string;
    date?: Date;
    from?: Date;
    to?: Date;
    categories?: string[] | string;
    skip?: number;
    take?: number;
};

export type ListActivitiesQueryValues = ListActivitiesQueryProps[keyof ListActivitiesQueryProps];

export class ListActivitiesService {
    async execute({authorId, query}: ListActivitiesServiceProps) {
        
        if ( !ObjectId.isValid(authorId) ) throw new Error('Missing request data.');

        const filters: { [key: string]: any } = {};

        const filter: { [key: string]: (value: any) => any } = {
            "type": (type: string) => validateActivityType(type) && validateActivityType(type) as string,
            "date": (date: Date) => isDateValid(date) && new Date(date),
            "from": (from: Date) => isDateValid(from) && new Date(from),
            "to": (to: Date) => isDateValid(to) && new Date(to),
            "categories": (categories: Array<string> | string) => {
                if ( typeof categories === 'string' ) {
                    if ( validateNames(categories) ) return [ categories ];
                } 
                else {
                    if ( categories.every((category: string) => validateNames(category)) ) return categories;
                }
            },
            "skip": (skip: number) => Number.isInteger(skip) && skip,
            "take": (take: number) => Number.isInteger(take) && take,
        };

        Object.entries(query).forEach(([key, value]: [string, ListActivitiesQueryValues]) => {

            if ( value === undefined ) return; // query parameters not provided

            if ( !filter[key](value) ) throw new Error(`Invalid query ${key} parameter provided`); // query parameter where provided but did not pass validation

            filters[key] = filter[key](value); // query parameter provided and passed validation

        });
        
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
                AND: filters.categories && filters.categories.map((category: string) => ({
                    categories: {
                        some: {
                            name: category
                        }
                    }
                })),
                categories: {
                    some: {
                        name: filters.category
                    }
                }
            },
            skip: filters.skip,
            take: filters.take,
        });
            
        return cashFlowActivitiesList;

    }
}
