import prismaClient from "@prismaClient";

type UpdateCreditCardServiceProps = {
    ownerId: string,
    creditCardId: string,
    name?: string,
    limit?: number,
    billClosingDay?: number,
    billDueDay?: number,
    brand?: string
};

export class UpdateCreditCardService {
    async execute({ownerId, creditCardId, name, limit, billClosingDay, billDueDay, brand}: UpdateCreditCardServiceProps) {
        
        if ( !ownerId || !creditCardId ) throw new Error('Missing request data.');
        
        const updatedCreditCard = await prismaClient.creditCard.update({
            where: {
                ownerID: ownerId,
                id: creditCardId
            },
            data: {
                name,
                limit,
                billClosingDay,
                billDueDay,
                brand
            }
        });

        return updatedCreditCard;
    }
}