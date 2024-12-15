import prismaClient from "../prisma";
import { CashFlowMovementType, CashFlowMovement, CashFlowCategory } from "@prisma/client"
import { CreateCashFlowCategoryService } from "./CreateCashFlowCategory";

type CreateCashFlowMovementServiceProps = {
    authorId: CashFlowMovement["authorId"];
    type: string;
    value: number;
    categories: string[];
    notes?: string;
    date?: Date;
}

export class CreateCashFlowMovementService {
    async execute({authorId, type, value, categories, notes, date}: CreateCashFlowMovementServiceProps) {

        if ( !authorId || !value || !type || !categories ) throw new Error('Missing request data.')
        
        if ( !['INCOME', 'EXPENSE'].includes(type.toUpperCase()) ) throw new Error('Invalid type.')

        const cashFlowMovement = await prismaClient.cashFlowMovement.create({
            data: {
                authorId,
                type: type.toUpperCase() as CashFlowMovementType,
                value,
                notes,
                date,
                categories: {
                    connectOrCreate: categories.map(category => ({
                        create: { name: category.toLowerCase(), authorId },
                        where: { name: category.toLowerCase() }
                    }))
                }
            
            }
        });

        return cashFlowMovement
    }
}