import prismaClient from "@prismaClient";
import validateNames from "src/utils/validateNames";
import { ObjectId } from "mongodb";

type UpdateBankAccountServiceProps = {
    ownerId: string;
    id: string;
    name: string;
    balance: number;
}

export class UpdateBankAccountService {
    async execute({ ownerId, id, name, balance }: UpdateBankAccountServiceProps) {

        if ( !ObjectId.isValid(ownerId) || !ObjectId.isValid(id) ) throw new Error('Missing request data.');

        const accountExists = await prismaClient.bankAccount.findFirst({ where: { id, ownerID: ownerId } });

        if (!accountExists) throw new Error('Account not found.');

        // if ( !validateNames(name) || Number.isNaN(balance) ) throw new Error('Invalid data sent. Please, try again.');

        try {

            const updatedBankAccount = await prismaClient.bankAccount.update({ where: { ownerID: ownerId, id }, data: { name, balance } });
            return updatedBankAccount;

        }
        catch (error) {

            throw new Error(`Cannot complete operation.\n ${error}`);

        }
    }
};