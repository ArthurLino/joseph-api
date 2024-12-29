import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { DeleteCreditCardService } from "@creditCardServices";
import { FastifyReply } from "fastify";

export class DeleteCreditCardController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        const ownerId = request.user.id as string;

        const { id } = request.params as { id: string };

        const deletedCreditCard = await new DeleteCreditCardService().execute({ownerId, creditCardId: id});

        return reply.send(deletedCreditCard).code(204);
    }
}