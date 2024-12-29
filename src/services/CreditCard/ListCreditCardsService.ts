import prismaClient from "@prismaClient";

export class ListCreditCardsService {
    async execute(ownerId: string) {
        
        if ( !ownerId ) throw new Error('Missing request data.');
        
        const creditCards = await prismaClient.creditCard.findMany({
            where: {
                ownerID: ownerId
            }
        });
        
        return creditCards;
    }
}