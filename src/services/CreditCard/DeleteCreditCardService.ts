import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type DeleteCreditCardServiceProps = {
    ownerId: string,
    creditCardId: string
};

export class DeleteCreditCardService {
    async execute({ownerId, creditCardId}: DeleteCreditCardServiceProps) {

        if ( !ObjectId.isValid(ownerId) || !ObjectId.isValid(creditCardId) ) throw new Error('Missing request data.');
        
        const deletedCreditCard = await prismaClient.creditCard.delete({
            where: {
                ownerID: ownerId,
                id: creditCardId
            }
        });

        return deletedCreditCard;
    }
}