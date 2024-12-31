import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { DeleteBankAccountService } from "@bankAccountServices";
import { FastifyReply } from "fastify";

export class DeleteBankAccountController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const ownerId = request.user.id as string;
        
        const { id } = request.params as { id: string };

        const deleteBankAccountService = new DeleteBankAccountService();
        const deletedBankAccount = await deleteBankAccountService.execute({ 
            ownerId, 
            id 
        });

        reply.send({message: 'Bank account was deleted.', data: deletedBankAccount}).code(200);
    }
}