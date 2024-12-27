import prismaClient from "@prismaClient";

type CreateBankAccountServiceProps = {
    ownerId: string;
    name: string;
    balance: number;
}

export class CreateBankAccountService {
    async execute({ownerId, name, balance }: CreateBankAccountServiceProps) {

        if ( !ownerId ) throw new Error('Missing owner ID.');

        if ( !name || Number.isNaN(balance) ) throw new Error('Missing request data.');

        const newBankAccount = await prismaClient.bankAccount.create({
            data: {
                name,
                balance,
                owner: {
                    connect: { id: ownerId }
                }
            }
        });

        return newBankAccount;
    }
}