import prismaClient from "@prismaClient";

export class DeleteCreditCardService {
    async execute({ownerId, creditCardId}: {ownerId: string, creditCardId: string}) {

        if ( !ownerId || !creditCardId ) throw new Error('Missing request data.');
        
        const deletedCreditCard = await prismaClient.creditCard.delete({
            where: {
                ownerID: ownerId,
                id: creditCardId
            }
        });

        return deletedCreditCard;
    }
}