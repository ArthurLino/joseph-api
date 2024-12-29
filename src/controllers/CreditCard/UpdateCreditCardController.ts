import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { UpdateCreditCardService } from "@creditCardServices";
import { FastifyReply } from "fastify";

export class UpdateCreditCardController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const ownerId = request.user.id as string;

        const { id } = request.params as { id: string };

        const { name, limit, billClosingDay, billDueDay, brand } = request.body as { 
            name: string, 
            limit: number, 
            billClosingDay: number, 
            billDueDay: number, 
            brand: string 
        };

        const updatedCreditCard = await new UpdateCreditCardService().execute({ 
            ownerId, 
            creditCardId: id, 
            name,
            limit,
            billClosingDay,
            billDueDay,
            brand
        });

        return reply.send(updatedCreditCard).code(200);        
    }
}