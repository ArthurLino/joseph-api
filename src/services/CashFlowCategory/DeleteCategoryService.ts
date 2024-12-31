import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

export class DeleteCategoryService {
    async execute({ authorId, id }: { authorId: string, id: string }) {

        if ( !ObjectId.isValid(authorId) || !ObjectId.isValid(id) ) throw new Error('Missing request data.');

        const categoryExists = await prismaClient.cashFlowCategory.findFirst({ where: { id, authorID: authorId } });

        if (!categoryExists) throw new Error('Category not found.');

        try {
        
            const deletedCategory = await prismaClient.cashFlowCategory.delete({ where: { id, authorID: authorId } });

            return deletedCategory;

        } catch (error) {

            throw new Error(`Cannot complete operation.\n ${error}`);

        }
    }
}