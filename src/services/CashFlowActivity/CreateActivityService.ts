import prismaClient from "@prismaClient";
import { CashFlowActivityType } from "@prisma/client"
import validateActivityType from "@utils/validateActivityType";

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
        
        if ( !validateActivityType(type) ) throw new Error('Invalid type.');

        const newActivity = await prismaClient.cashFlowActivity.create({
            data: {
                authorID: authorId,
                type: validateActivityType(type) as CashFlowActivityType,
                value,
                notes,
                date,
                categories: {
                    connectOrCreate: categories.map(category => ({
                        create: { name: category.toLowerCase(), authorID: authorId },
                        where: { name: category.toLowerCase() }
                    }))
                }
            
            }
        });

        return newActivity;
    }
}