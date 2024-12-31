import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type ListBankAccountsServiceProps = { ownerId: string; };

export class ListBankAccountsService {
    async execute({ ownerId }: ListBankAccountsServiceProps) {

        if ( !ObjectId.isValid(ownerId) ) throw new Error('Missing request data.')

        const bankAccounts = await prismaClient.bankAccount.findMany({ where: { ownerID: ownerId } });

        if (!bankAccounts) throw new Error('No bank accounts found for this user.');

        return bankAccounts;
    }
};