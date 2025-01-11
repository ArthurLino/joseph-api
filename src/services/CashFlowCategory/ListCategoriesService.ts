import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type ListCategoriesServiceProps = { 
    authorId: string;
    query: ListCategoriesQueryProps;
    params: ListCategoryParams;
};

type ListCategoriesQueryProps = {
    skip?: number;
    take?: number;
}

type ListCategoryParams = {
    id: string;
};

export type ListCategoriesQueryValues = ListCategoriesQueryProps[keyof ListCategoriesQueryProps];

export class ListCategoriesService {
    async execute({ authorId, query, params }: ListCategoriesServiceProps) {

        if ( !ObjectId.isValid(authorId) ) throw new Error('Missing request data.');
            
        const accountId = ObjectId.isValid(params.id) && params.id;

        const categories = await prismaClient.cashFlowCategory.findMany({ 
            where: { 
                authorID: authorId,
                ...(accountId ? { id: accountId } : {})
            }, 
            skip: query.skip,
            take: query.take
        });

        if (!categories) throw new Error('No categories found for this user. Try creating a category first.');

        return categories;
    }
}