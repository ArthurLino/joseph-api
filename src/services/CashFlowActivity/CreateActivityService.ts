import prismaClient from "@prismaClient";
import validateActivityType from "src/utils/validateActivityType";
import validatePaymentMethod from "src/utils/validatePaymentMethod";
import { CashFlowActivityType, PaymentMethod } from "@prisma/client"
import { ObjectId } from "mongodb";

type CreateActivityServiceProps = {
    authorId: string;
    type: string;
    paymentMethod?: string;
    creditCardId?: string;
    value: number;
    categories?: string[];
    notes?: string;
    date?: Date;
    bankAccountId?: string; 
}

export class CreateActivityService {
    async execute({authorId, type, paymentMethod, creditCardId, value, categories, notes, date, bankAccountId}: CreateActivityServiceProps) {

        if ( !ObjectId.isValid(authorId) || Number.isNaN(value) ) throw new Error('Missing request data.');
        
        if ( !validateActivityType(type) ) throw new Error('Invalid type.');

        if ( validateActivityType(type) === 'EXPENSE' && !validatePaymentMethod(paymentMethod) ) throw new Error('Missing (valid) payment method.');
        
        if ( validateActivityType(type) === 'INCOME' && paymentMethod ) throw new Error('Income activities should not have payment methods.');

        if ( validatePaymentMethod(paymentMethod) == "CREDIT_CARD" && !creditCardId ) throw new Error('Missing credit card.');

        const defaultAccount = await prismaClient.bankAccount.findFirst({ where: { ownerID: authorId, deletable: false } }) as { id: string };
        const isAccountValid = await prismaClient.bankAccount.findFirst({ where: { ownerID: authorId, id: bankAccountId } });

        const newActivity = await prismaClient.cashFlowActivity.create({
            data: {
                authorID: authorId,
                type: validateActivityType(type) as CashFlowActivityType,
                paymentMethod: validatePaymentMethod(paymentMethod) as PaymentMethod, 
                value,
                notes,
                date,
                bankAccountID: isAccountValid ? bankAccountId! : defaultAccount.id,
                categories: categories && {
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