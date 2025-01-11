import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type ListCreditCardsServiceProps = {
    ownerId: string;
    query: ListCreditCardsQueryProps;
    params: ListCreditCardParams;
};

type ListCreditCardsQueryProps = {
    skip?: number;
    take?: number;
}

type ListCreditCardParams = {
    id: string;
};

export type ListCreditCardsQueryValues = ListCreditCardsQueryProps[keyof ListCreditCardsQueryProps];

export class ListCreditCardsService {
    async execute({ownerId, query, params}: ListCreditCardsServiceProps) {
        
        if ( !ObjectId.isValid(ownerId) ) throw new Error('Missing request data.');

        const accountId = ObjectId.isValid(params.id) && params.id;
        
        const creditCards = await prismaClient.creditCard.findMany({
            where: { 
                ownerID: ownerId,
                ...(accountId ? { id: accountId } : {})
            },
            skip: query.skip,
            take: query.take
        });
        
        return creditCards;
    }
}