import prismaClient from "@prismaClient";
import { CashFlowActivityType } from "@prisma/client"
import validateActivityType from "@utils/validateActivityType";
import { connect } from "http2";
import { ObjectId } from "mongodb";
import { create } from "domain";

type CreateActivityServiceProps = {
    authorId: string;
    type: string;
    value: number;
    categories: string[];
    notes?: string;
    date?: Date;
    bankAccountId?: string; 
}

export class CreateActivityService {
    async execute({authorId, type, value, categories, notes, date, bankAccountId}: CreateActivityServiceProps) {

        if ( !authorId || !value || !type || !categories ) throw new Error('Missing request data.');
        
        if ( !validateActivityType(type) ) throw new Error('Invalid type.');
        
        const defaultAccount = await prismaClient.bankAccount.findFirst({ where: { ownerID: authorId, deletable: false } }) as { id: string };
        const isAccountValid = await prismaClient.bankAccount.findFirst({ where: { id: bankAccountId, ownerID: authorId } });

        const newActivity = await prismaClient.cashFlowActivity.create({
            data: {
                authorID: authorId,
                type: validateActivityType(type) as CashFlowActivityType,
                value,
                notes,
                date,
                bankAccountID: isAccountValid ? bankAccountId! : defaultAccount.id,
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