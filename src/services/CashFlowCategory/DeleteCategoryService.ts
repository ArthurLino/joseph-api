import prismaClient from "src/prisma";

export class DeleteCashFlowCategoryService {
    async execute({ authorId, id }: { authorId: string, id: string }) {

        if (!id || !authorId) throw new Error('Missing request data.');

        try {
        
            const deletedCategory = await prismaClient.cashFlowCategory.delete({ where: { id, authorID: authorId } });

            return deletedCategory;

        } catch (error) {

            throw new Error(`Cannot complete operation.\n ${error}`);
            
        }
    }
}