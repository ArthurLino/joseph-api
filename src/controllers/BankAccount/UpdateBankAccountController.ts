import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { UpdateBankAccountService } from "@bankAccountServices";
import { FastifyReply } from "fastify";

export class UpdateBankAccountController {
        async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
            const ownerId = request.user.id as string;
    
            const { id } = request.params as { id: string };
            const { name, balance } = request.body as { name: string, balance: number};
    
            const updatedBankAccount = await new UpdateBankAccountService().execute({ 
                ownerId, 
                id, 
                name, 
                balance 
            });
    
            reply.send({message: 'Bank Account was updated.', data: updatedBankAccount}).code(200);
        }
}