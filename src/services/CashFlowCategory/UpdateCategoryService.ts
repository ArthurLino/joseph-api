import prismaClient from "@prismaClient";

export class UpdateCashFlowCategoryService {
    async execute({ authorId, id, name }: { authorId: string, id: string, name: string }) {

        if (!authorId || !id || !name) throw new Error('Missing request data.');

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