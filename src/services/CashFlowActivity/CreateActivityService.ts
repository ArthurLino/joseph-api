import prismaClient from "@prismaClient";
import { CashFlowActivityType } from "@prisma/client"
import validateActivityType from "@utils/validateActivityType";
import { connect } from "http2";
import { ObjectId } from "mongodb";

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

        const connections: { BankAccount: null | string } = {
            BankAccount: null
        };

        if ( bankAccountId ) {
            
            const isAccountValid = prismaClient.bankAccount.findFirst({ where: { id: bankAccountId, ownerID: authorId } });

            if (!isAccountValid) throw new Error('Invalid bank account.');

            connections.BankAccount = bankAccountId;

        }

        const newActivity = await prismaClient.cashFlowActivity.create({
            data: {
                authorID: authorId,
                type: validateActivityType(type) as CashFlowActivityType,
                value,
                notes,
                date,
                bankAccountID: bankAccountId ? connections.BankAccount as string : undefined,
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