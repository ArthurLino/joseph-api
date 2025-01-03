import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type ListCreditCardsServiceProps = {
    ownerId: string;
    query: ListCreditCardsQueryProps;
};

type ListCreditCardsQueryProps = {
    skip?: number;
    take?: number;
}

export type ListCreditCardsQueryValues = ListCreditCardsQueryProps[keyof ListCreditCardsQueryProps];

export class ListCreditCardsService {
    async execute({ownerId, query}: ListCreditCardsServiceProps) {
        
        if ( !ObjectId.isValid(ownerId) ) throw new Error('Missing request data.');
                    
        const filters: { [key: string]: any } = {};

        const filter: { [key: string]: (value: any) => any } = {
            "skip": (skip: number) => Number.isInteger(skip) && skip,
            "take": (take: number) => Number.isInteger(take) && take,
        };

        Object.entries(query).forEach(([key, value]: [string, ListCreditCardsQueryValues]) => {

            if (value === undefined) return; // query parameters not provided

            if (!filter[key](value)) throw new Error(`Invalid query ${key} parameter provided`); // query parameter was provided but did not pass validation

            filters[key] = filter[key](value); // query parameter provided and passed validation

        });
        
        const creditCards = await prismaClient.creditCard.findMany({
            where: { ownerID: ownerId },
            skip: filters.skip,
            take: filters.take
        });
        
        return creditCards;
    }
}