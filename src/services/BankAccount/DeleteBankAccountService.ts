import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

export class DeleteBankAccountService {
    async execute({ ownerId, id }: { ownerId: string, id: string }) {

        if ( !ObjectId.isValid(id) || !ownerId ) throw new Error('Missing request data.');

        const accountExists = await prismaClient.bankAccount.findFirst({ where: { id, ownerID: ownerId } });

        if (!accountExists) throw new Error('Account not found.');

        try {
        
            const deletedAccount = await prismaClient.bankAccount.delete({ where: { id, ownerID: ownerId } });

            return deletedAccount;

        } catch (error) {

            throw new Error(`Cannot complete operation.\n ${error}`);

        }
    }
};