import prismaClient from "@prismaClient";
import validateNames from "@utils/validateNames";
import { ObjectId } from "mongodb";

type UpdateCategoryServiceProps = {
    authorId: string;
    id: string;
    name: string;
};

export class UpdateCategoryService {
    async execute({ authorId, id, name }: UpdateCategoryServiceProps) {

        if (!ObjectId.isValid(authorId) || !ObjectId.isValid(id) || validateNames(name)) throw new Error('Missing request data.');

        const categoryExists = await prismaClient.cashFlowCategory.findFirst({ where: { id, authorID: authorId } });

        if (!categoryExists) throw new Error('Category not found.');

        try {

            const updatedCategory = await prismaClient.cashFlowCategory.update({ where: { id, authorID: authorId }, data: { name } });
            return updatedCategory;

        }
        catch (error) {

            throw new Error(`Cannot complete operation.\n ${error}`);

        }
    }
}