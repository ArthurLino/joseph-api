import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { ListBankAccountsService } from "@bankAccountServices";
import { FastifyReply } from "fastify";

export class ListBankAccountsController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        const ownerId = request.user.id;

        const listBankAccountsService = new ListBankAccountsService();

        const bankAccounts = await listBankAccountsService.execute(ownerId);
        
        reply.send(bankAccounts).code(200);
    }
}