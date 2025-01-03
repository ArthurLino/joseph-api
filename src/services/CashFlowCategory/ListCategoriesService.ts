import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type ListCategoriesServiceProps = { 
    authorId: string;
    query: ListCategoriesQueryProps;
};

type ListCategoriesQueryProps = {
    skip?: number;
    take?: number;
}

export type ListCategoriesQueryValues = ListCategoriesQueryProps[keyof ListCategoriesQueryProps];

export class ListCategoriesService {
    async execute({ authorId, query }: ListCategoriesServiceProps) {

        if ( !ObjectId.isValid(authorId) ) throw new Error('Missing request data.')
            
        const filters: { [key: string]: any } = {};

        const filter: { [key: string]: (value: any) => any } = {
            "skip": (skip: number) => Number.isInteger(skip) && skip,
            "take": (take: number) => Number.isInteger(take) && take,
        };

        Object.entries(query).forEach(([key, value]: [string, ListCategoriesQueryValues]) => {

            if (value === undefined) return; // query parameters not provided

            if (!filter[key](value)) throw new Error(`Invalid query ${key} parameter provided`); // query parameter was provided but did not pass validation

            filters[key] = filter[key](value); // query parameter provided and passed validation

        });

        const categories = await prismaClient.cashFlowCategory.findMany({ 
            where: { authorID: authorId }, 
            skip: filters.skip,
            take: filters.take
        });

        if (!categories) throw new Error('No categories found for this user. Try creating a category first.');

        return categories;
    }
}