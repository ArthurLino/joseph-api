import prismaClient from "src/prisma";

export class ListCashFlowCategoriesService {
    async execute({ authorId }: { authorId: string}) {

        const cashFlowCategories = await prismaClient.cashFlowCategory.findMany({ where: { authorId } });

        if (!cashFlowCategories) throw new Error('No categories found for this user.');

        return cashFlowCategories;
    }
}