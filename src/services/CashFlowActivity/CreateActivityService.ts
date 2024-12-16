import prismaClient from "@prismaClient";
import { CashFlowActivityType } from "@prisma/client"

type CreateActivityServiceProps = {
    authorId: string;
    type: string;
    value: number;
    categories: string[];
    notes?: string;
    date?: Date;
}

export class CreateActivityService {
    async execute({authorId, type, value, categories, notes, date}: CreateActivityServiceProps) {

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