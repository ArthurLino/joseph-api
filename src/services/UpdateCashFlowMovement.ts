import { ObjectId } from "mongodb";
import prismaClient from "../prisma";
import { CashFlowMovement, CashFlowMovementType } from "@prisma/client";

type UpdateCashFlowMovementServiceProps = {
    authorId: CashFlowMovement["authorId"];
    id: string;
    type: CashFlowMovementType;
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

        const cashFlowMovementExists = await prismaClient.cashFlowMovement.findFirst({
            where: {
                id: id, 
                // authorId: authorId
            }
        });

        if ( !cashFlowMovementExists ) throw new Error("Cash flow movement does not exist.");

        const cashFlowMovement = await prismaClient.cashFlowMovement.update({
            where: {
                id: id,
                authorId: authorId
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

        return cashFlowMovement;

    }
}