import prismaClient from "@prismaClient";
import validateNames from "@utils/validateNames";
import { ObjectId } from "mongodb";

type CreateCreditCardServiceProps = { 
    ownerId: string,
    name: string,
    limit: number,
    billClosingDay: number,
    billDueDay: number,
    brand: string,
    bankAccountId: string   
};

export class CreateCreditCardService {
    async execute({ ownerId, name, limit, billClosingDay, billDueDay, brand, bankAccountId }: CreateCreditCardServiceProps) {

        if ( !ObjectId.isValid(ownerId) || !ObjectId.isValid(bankAccountId) ) throw new Error('Missing request data.');

        console.log("condition:", (validateNames(name) && validateNames(brand)));

        if ( !validateNames(name) || !validateNames(brand) ) throw new Error('Invalid name or brand.');

        if ( Number.isNaN(limit) || limit < 0 ) throw new Error('Invalid card limit.');

        if ( billClosingDay < 1 || billClosingDay > 31 || billDueDay < 1 || billDueDay > 31 ) throw new Error('Invalid billing day.');

        const newCreditCard = await prismaClient.creditCard.create({
            data: {
                name,
                limit,
                billClosingDay,
                billDueDay,
                brand,
                bankAccountID: bankAccountId,
                ownerID: ownerId
            }
        });

        return newCreditCard;
    }
}