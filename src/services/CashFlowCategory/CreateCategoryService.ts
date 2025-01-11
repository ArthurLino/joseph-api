import prismaClient from "@prismaClient";
import validateNames from "src/utils/validateNames";
import { ObjectId } from "mongodb";

type CreateCategoryServiceProps = {
    name: string;
    authorId: string;
}

export class CreateCategoryService {
    async execute({ name, authorId }: CreateCategoryServiceProps) {
        
        if ( !ObjectId.isValid(authorId) || !validateNames(name) ) throw new Error('Missing request data.')

        const formattedName = validateNames(name) as string;

        const categoryExists = await prismaClient.cashFlowCategory.findFirst({
            where: {
                name: formattedName,
                authorID: authorId
            }
        });

        if (categoryExists) throw new Error('Category already exists.');

        const newCategory = await prismaClient.cashFlowCategory.create({
            data: {
                name: formattedName,
                authorID: authorId
            }
        });

        return newCategory;
    }
}