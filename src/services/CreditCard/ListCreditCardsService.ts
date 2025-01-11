import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type ListCreditCardsServiceProps = {
    ownerId: string;
    query: ListCreditCardsQueryProps;
};

type ListCreditCardsQueryProps = {
    skip?: number;
    take?: number;
};

export class ListCreditCardsService {
    async execute({ownerId, query}: ListCreditCardsServiceProps) {
        
        if ( !ObjectId.isValid(ownerId) ) throw new Error('Missing request data.');
        
        const creditCards = await prismaClient.creditCard.findMany({
            where: { ownerID: ownerId },
            skip: query.skip,
            take: query.take
        });
        
        return creditCards;
    }
}