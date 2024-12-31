import prismaClient from "@prismaClient";
import validateCategoryName from "@utils/validateCategoryName";
import { ObjectId } from "mongodb";

type UpdateCategoryServiceProps = {
    authorId: string;
    id: string;
    name: string;
}

export class UpdateCategoryService {
    async execute({ authorId, id, name }: UpdateCategoryServiceProps) {

        if (!ObjectId.isValid(authorId) || !ObjectId.isValid(id) || validateCategoryName(name)) throw new Error('Missing request data.');

        const categoryExists = await prismaClient.cashFlowCategory.findFirst({ where: { id, authorID: authorId } });

        if (!categoryExists) throw new Error('Category not found.');

        try {

            const updatedCategory = await prismaClient.cashFlowCategory.update({ where: { id }, data: { name } });
            return updatedCategory;

        }
        catch (error) {

            throw new Error(`Cannot complete operation.\n ${error}`);

        }
    }
}