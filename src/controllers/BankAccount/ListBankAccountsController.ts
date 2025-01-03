import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { ListBankAccountsService } from "@bankAccountServices";
import { FastifyReply } from "fastify";
import { ListBankAccountsQueryValues } from "src/services/BankAccount/ListBankAccountsService";

export class ListBankAccountsController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const ownerId = request.user.id;
        const query = request.query as { [key: string]: ListBankAccountsQueryValues }; 

        const listBankAccountsService = new ListBankAccountsService();
        const bankAccounts = await listBankAccountsService.execute({ ownerId, query });
        
        reply.send(bankAccounts).code(200);
    }
}