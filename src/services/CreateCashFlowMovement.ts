import prismaClient from "../prisma";
import { CashFlowMovementType, CashFlowMovement, CashFlowCategory } from "@prisma/client"

type CreateCashFlowMovementServiceProps = {
    authorId: CashFlowMovement["authorId"];
    type: CashFlowMovementType
    value: number;
    categories: string[];
    notes?: string;
    date?: Date;
}

export class CreateCashFlowMovementService {
    async handle({authorId, type, value, categories, notes, date}: CreateCashFlowMovementServiceProps) {

        if ( !authorId || !value || !type || !categories ) throw new Error('Missing request data.')

        const existingCashFlowCategories: unknown | CashFlowCategory[] = categories.map(async (category) => {
            await prismaClient.cashFlowCategory.findUniqueOrThrow({ where: {name: category.toLowerCase()}})
        }) 

        const cashFlowMovement = await prismaClient.cashFlowMovement.create({
            data: {
                authorId,
                type,
                value,
                notes,
                date,
                // categories: typeof existingCashFlowCategories === CashFlowCategory[] && existingCashFlowCategories
            }
        });

        return cashFlowMovement
    }
}