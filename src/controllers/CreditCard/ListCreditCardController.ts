import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { ListCreditCardsService } from "@creditCardServices";
import { FastifyReply } from "fastify";

export class ListCreditCardsController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const ownerId = request.user.id as string;

        const listCreditCardsService = new ListCreditCardsService();
        const creditCards = await listCreditCardsService.execute(ownerId);

        return reply.send(creditCards).code(200);
    }
}