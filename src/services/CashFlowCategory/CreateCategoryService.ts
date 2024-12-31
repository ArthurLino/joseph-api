import prismaClient from "@prismaClient";
import validateCategoryName from "@utils/validateCategoryName";

export class CreateCategoryService {
    async execute({ name, authorId }: {name: string, authorId: string}) {
        
        if ( !authorId || !validateCategoryName(name) ) throw new Error('Missing request data.')

        const formattedName = validateCategoryName(name) as string;

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