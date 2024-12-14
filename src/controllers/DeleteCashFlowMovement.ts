import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { DeleteCashFlowMovementService } from "@services/DeleteCashFlowMovement";
import { FastifyReply } from "fastify";

export class DeleteCashFlowMovementController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
    
        const authorId = request.user.id as string;

        const { id } = request.params as { id: string };
    
        if ( !id || !authorId ) return reply.code(400).send("Invalid params sent.");

        const deleteCashFlowMovementService = await new DeleteCashFlowMovementService().execute({ authorId, id });

        reply.send({message: 'Object deleted.', data: deleteCashFlowMovementService}).code(200);
    }
}