import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type ListCategoriesServiceProps = { authorId: string; }

export class ListCategoriesService {
    async execute({ authorId }: ListCategoriesServiceProps) {

        if ( !ObjectId.isValid(authorId) ) throw new Error('Missing request data.')

        const categories = await prismaClient.cashFlowCategory.findMany({ where: { authorID: authorId } });

        if (!categories) throw new Error('No categories found for this user. Try creating a category first.');

        return categories;
    }
}