import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { ListCreditCardsService } from "@creditCardServices";
import { FastifyReply } from "fastify";
import { ListCreditCardsQueryValues } from "src/services/CreditCard/ListCreditCardsService";

export class ListCreditCardsController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const ownerId = request.user.id as string;
        const query = request.query as { [key: string]: ListCreditCardsQueryValues };

        const listCreditCardsService = new ListCreditCardsService();
        const creditCards = await listCreditCardsService.execute({ownerId, query});

        return reply.send(creditCards).code(200);
    }
}