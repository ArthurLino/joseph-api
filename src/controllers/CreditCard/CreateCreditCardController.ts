import { FastifyReply } from "fastify";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { CreateCreditCardService } from "@creditCardServices";

export class CreateCreditCardController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const ownerId = request.user.id as string;

        const { name, limit, billClosingDay, billDueDay, brand, bankAccountId } = request.body as { 
            name: string,
            limit: number,
            billClosingDay: number,
            billDueDay: number,
            brand: string,
            bankAccountId: string   
        };

        const createCreditCardService = new CreateCreditCardService();
        const creditCard = await createCreditCardService.execute({
            ownerId,
            name,
            limit,
            billClosingDay,
            billDueDay,
            brand,
            bankAccountId: bankAccountId,
        });
        
        return reply.code(201).send({"message": "New credit card created.", creditCard});
    }
}