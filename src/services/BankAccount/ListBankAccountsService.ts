import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type ListBankAccountsServiceProps = { 
    ownerId: string; 
    query: ListBankAccountsQueryProps;
    params: ListBankAccountParams;
};

type ListBankAccountsQueryProps = {
    skip?: number;
    take?: number;
}

type ListBankAccountParams = {
    id: string;
}

export class ListBankAccountsService {
    async execute({ ownerId, query, params }: ListBankAccountsServiceProps) {

        if ( !ObjectId.isValid(ownerId) ) throw new Error('Missing request data.')

        const accountId = ObjectId.isValid(params.id) && params.id;

        const bankAccounts = await prismaClient.bankAccount.findMany({ 
            where: { 
                ownerID: ownerId,
                ...(accountId ? { id: accountId } : {})
            },
            skip: query.skip,
            take: query.take
        });

        return bankAccounts;
    }
};