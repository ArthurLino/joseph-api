import { FastifyReply } from "fastify";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { CreateBankAccountService } from "@bankAccountServices";

export class CreateBankAccountController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const ownerId = request.user.id as string;

        const { name, balance } = request.body as {
            name: string;
            balance: number;
        };

        const createBankAccountService = new CreateBankAccountService();
        const newBankAccount = await createBankAccountService.execute({
            ownerId,
            name,
            balance,
        });

        reply.send(newBankAccount).code(201);
    }
}