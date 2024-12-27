import validateActivityType from "@utils/validateActivityType";
import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type UpdateActivityServiceProps = {
    authorId: string;
    id: string;
    type: string;
    value: number;
    categories: string[];
    notes: string;
    date: Date;
}

export class UpdateActivityService {
    async execute({ authorId, id, type, value, categories, notes, date}: UpdateActivityServiceProps) {

        if ( !authorId || !id ) throw new Error('Missing request data.');

        if ( !ObjectId.isValid(id) ) throw new Error("Invalid id.");
        
        if ( !validateActivityType(type) ) throw new Error('Invalid type.');

        const data = { 
            type: validateActivityType(type), 
            value: value, 
            notes: notes, 
            date: date 
        } as { [key: string]: any };
        
        Object.entries(data).forEach(([key, value]: [string, any]) => { if (value === undefined) delete data[key] });

        const activityExists = await prismaClient.cashFlowActivity.findFirst({
            where: {
                id: id, 
                authorID: authorId
            }
        });

        if ( !activityExists ) throw new Error("Cash flow movement does not exist.");

        const activity = await prismaClient.cashFlowActivity.update({
            where: {
                id: id,
                authorID: authorId
            },
            data: {
                ...data,
                categories: {
                    connectOrCreate: categories && categories.map(category => ({
                        create: { name: category.toLowerCase(), authorId },
                        where: { name: category.toLowerCase() }
                    })
                    )
                }
            }

        });

        return activity;

    }
}