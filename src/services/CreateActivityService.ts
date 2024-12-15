import prismaClient from "../prisma";
import { CashFlowActivityType, CashFlowActivity } from "@prisma/client"

type CreateCashFlowActivityServiceProps = {
    authorId: CashFlowActivity["authorID"];
    type: string;
    value: number;
    categories: string[];
    notes?: string;
    date?: Date;
}

export class CreateCashFlowActivityService {
    async execute({authorId, type, value, categories, notes, date}: CreateCashFlowActivityServiceProps) {

        if ( !authorId || !value || !type || !categories ) throw new Error('Missing request data.')
        
        if ( !['INCOME', 'EXPENSE'].includes(type.toUpperCase()) ) throw new Error('Invalid type.')

        const newActivity = await prismaClient.cashFlowActivity.create({
            data: {
                authorID: authorId,
                type: type.toUpperCase() as CashFlowActivityType,
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

        return newActivity;
    }
}