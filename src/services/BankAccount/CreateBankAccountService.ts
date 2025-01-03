import prismaClient from "@prismaClient";
import validateNames from "@utils/validateNames";
import { ObjectId } from "mongodb";

type CreateBankAccountServiceProps = {
    ownerId: string;
    name: string;
    balance: number;
};

export class CreateBankAccountService {
    async execute({ownerId, name, balance }: CreateBankAccountServiceProps) {

        if ( !ObjectId.isValid(ownerId) ) throw new Error('Missing owner ID.');

        if ( !validateNames(name) || Number.isNaN(balance) ) throw new Error('Missing request data.');

        const newBankAccount = await prismaClient.bankAccount.create({
            data: {
                name,
                balance,
                ownerID: ownerId
            }
        });

        return newBankAccount;
    }
}