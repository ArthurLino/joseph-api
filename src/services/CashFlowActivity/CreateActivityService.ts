import prismaClient from "../../prisma";
import { CashFlowActivityType } from "@prisma/client"

type CreateCashFlowActivityServiceProps = {
    authorId: string;
    type: string;
    value: number;
    categories: string[];
    notes?: string;
    date?: Date;
}

export class CreateCashFlowActivityService {
    async execute({authorId, type, value, categories, notes, date}: CreateCashFlowActivityServiceProps) {

        if ( !authorId || !value || !type || !categories ) throw new Error('Missing request data.');

        const formattedType = type.toUpperCase() as CashFlowActivityType;
        
        if ( Object.values(CashFlowActivityType).includes(formattedType) ) throw new Error('Invalid type.');

        const newActivity = await prismaClient.cashFlowActivity.create({
            data: {
                authorID: authorId,
                type: formattedType,
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