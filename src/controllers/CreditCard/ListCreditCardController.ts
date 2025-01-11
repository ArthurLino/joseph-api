import { FastifyReply } from "fastify";
import { ListCreditCardsService } from "@creditCardServices";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { ListCreditCardsQueryValues } from "@services/CreditCard/ListCreditCardsService";

export class ListCreditCardsController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const ownerId = request.user.id as string;
        const query = request.query as { [key: string]: ListCreditCardsQueryValues };
        const { id } = request.params as { id: string };

        const listCreditCardsService = new ListCreditCardsService();
        const creditCards = await listCreditCardsService.execute({
            ownerId, 
            query,
            params: { id },
        });

        return reply.send(creditCards).code(200);
    }
}