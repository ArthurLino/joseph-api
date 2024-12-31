import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type ListCreditCardsServiceProps = {
    ownerId: string;
};

export class ListCreditCardsService {
    async execute({ownerId}: ListCreditCardsServiceProps) {
        
        if ( !ObjectId.isValid(ownerId) ) throw new Error('Missing request data.');
        
        const creditCards = await prismaClient.creditCard.findMany({
            where: {
                ownerID: ownerId
            }
        });
        
        return creditCards;
    }
}