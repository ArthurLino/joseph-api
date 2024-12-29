import prismaClient from "@prismaClient";

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

        if ( !ownerId || !name || !limit || !billClosingDay || !billDueDay || !brand || !bankAccountId ) throw new Error('Missing request data.');

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