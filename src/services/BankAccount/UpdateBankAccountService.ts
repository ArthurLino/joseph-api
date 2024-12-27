import prismaClient from "@prismaClient";

export class UpdateBankAccountService {
    async execute({ ownerId, id, name, balance }: { ownerId: string, id: string, name: string, balance: number }) {

        if ( !ownerId || !id ) throw new Error('Missing request data.');

        const accountExists = await prismaClient.bankAccount.findFirst({ where: { id, ownerID: ownerId } });

        if (!accountExists) throw new Error('Account not found.');

        try {

            const updatedBankAccount = await prismaClient.bankAccount.update({ where: { id }, data: { name, balance } });
            return updatedBankAccount;

        }
        catch (error) {

            throw new Error(`Cannot complete operation.\n ${error}`);

        }
    }
};