import prismaClient from "../prisma";

export class CreateCashFlowCategoryService {
    async execute({ name, authorId }: {name: string, authorId: string}) {
        
        if ( !name || !authorId ) throw new Error('Missing request data.')

        const categoryExists = await prismaClient.cashFlowCategory.findFirst({where: {name: name.toLowerCase()}});
        if (categoryExists) throw new Error('Category already exists.');

        const financialCategory = await prismaClient.cashFlowCategory.create({
            data: {
                name: name.toLowerCase(),
                authorId
            }
        });

        return financialCategory
    }
}