import { FastifyReply } from "fastify";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { CreateBankAccountService } from "@bankAccountServices/index";

export class CreateBankAccountController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const ownerId = request.user.id as string;

        const { name, balance } = request.body as {
            name: string;
            balance: number;
        };

        console.log(request.body);

        const createBankAccountService = new CreateBankAccountService();

        const bankAccount = await createBankAccountService.execute({
            ownerId,
            name,
            balance,
        });

        reply.send(bankAccount).code(201);
    }
}