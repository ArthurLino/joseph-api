import prismaClient from "@prismaClient";

export class ListBankAccountsService {
    async execute({ ownerId }: { ownerId: string}) {

        if ( !ownerId ) throw new Error('Missing request data.')

        const bankAccounts = await prismaClient.bankAccount.findMany({ where: { ownerID: ownerId } });

        if (!bankAccounts) throw new Error('No bank accounts found for this user.');

        return bankAccounts;
    }
};