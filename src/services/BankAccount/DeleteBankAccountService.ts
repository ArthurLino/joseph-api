import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type DeleteBankAccountServiceProps = { 
    ownerId: string; 
    id: string; 
};

export class DeleteBankAccountService {
    async execute({ ownerId, id }: DeleteBankAccountServiceProps) {

        if ( !ObjectId.isValid(id) || !ObjectId.isValid(ownerId) ) throw new Error('Missing request data.');

        const accountExists = await prismaClient.bankAccount.findFirst({ where: { id, ownerID: ownerId } });

        if (!accountExists || !accountExists.deletable) throw new Error('Account undeletable or not found.');

        try {
        
            const deletedAccount = await prismaClient.bankAccount.delete({ where: { id, ownerID: ownerId } });

            return deletedAccount;

        } catch (error) {

            throw new Error(`Cannot complete operation.\n ${error}`);

        }
    }
};