import prismaClient from "@prismaClient";

export class ListCategoriesService {
    async execute({ authorId }: { authorId: string}) {

        if ( !authorId ) throw new Error('Missing request data.')

        const cashFlowCategories = await prismaClient.cashFlowCategory.findMany({ where: { authorID: authorId } });

        if (!cashFlowCategories) throw new Error('No categories found for this user.');

        return cashFlowCategories;
    }
}