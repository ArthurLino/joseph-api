import validateActivityType from "@utils/validateActivityType";
import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";
import { isDate } from "util/types";
import validateNames from "@utils/validateNames";

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

        if ( !ObjectId.isValid(authorId) || !ObjectId.isValid(id) ) throw new Error('Missing request data.');
        
        if ( !validateActivityType(type) ) throw new Error('Invalid type.');

        if ( Number.isNaN(value) ) throw new Error('Invalid value.');

        if ( !isDate(date) ) throw new Error('Invalid date.');

        categories && categories.forEach(category => {
            if ( !validateNames(category) ) throw new Error('Invalid category name.');
        });

        const data = { 
            type: validateActivityType(type), 
            value: value, 
            notes: notes, 
            date: date 
        } as { [key: string]: any };
        
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