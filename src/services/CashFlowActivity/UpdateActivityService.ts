import prismaClient from "../../prisma";
import { CashFlowActivity, CashFlowActivityType } from "@prisma/client";
import { ObjectId } from "mongodb";

type UpdateCashFlowMovementServiceProps = {
    authorId: CashFlowActivity["authorID"];
    id: string;
    type: CashFlowActivityType;
    value: number;
    categories: string[];
    notes: string;
    date: Date;
}

export class UpdateCashFlowMovementService {
    async execute({ authorId, id, type, value, categories, notes, date}: UpdateCashFlowMovementServiceProps) {

        if ( !authorId || !id ) throw new Error('Missing request data.')

        if ( !ObjectId.isValid(id) ) throw new Error("Invalid id.");

        const data = { 
            type: type, 
            value: value, 
            notes: notes, 
            date: date 
        } as { [key: string]: any };
        
        Object.entries(data).forEach(([key, value]: [string, any]) => { if (value === undefined) delete data[key] });

        const activityExists = await prismaClient.cashFlowActivity.findFirst({
            where: {
                id: id, 
                // authorId: authorId
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