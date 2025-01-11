import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type ListCategoriesServiceProps = { 
    authorId: string;
    query: ListCategoriesQueryProps;
};

type ListCategoriesQueryProps = {
    skip?: number;
    take?: number;
};

export class ListCategoriesService {
    async execute({ authorId, query }: ListCategoriesServiceProps) {

        if ( !ObjectId.isValid(authorId) ) throw new Error('Missing request data.')

        const categories = await prismaClient.cashFlowCategory.findMany({ 
            where: { authorID: authorId }, 
            skip: query.skip,
            take: query.take
        });

        if (!categories) throw new Error('No categories found for this user. Try creating a category first.');

        return categories;
    }
}