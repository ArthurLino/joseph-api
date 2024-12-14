import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { CashFlowMovementType } from "@prisma/client";
import { UpdateCashFlowMovementService } from "@services/UpdateCashFlowMovement";
import { FastifyReply } from "fastify";

export class UpdateCashFlowMovementController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
    
        const authorId = request.user.id as string;

        const { id } = request.params as { id: string };

        const { type, value, categories, notes, date } = request.body as {
            type: CashFlowMovementType, 
            value: number, 
            categories: string[], 
            notes: string,
            date: Date
        };
    
        if ( !id ) return reply.code(400).send("Invalid params sent.");

        const updateCashFlowMovementService = await new UpdateCashFlowMovementService().execute({ authorId, id, type, value, categories, notes, date });

        reply.send({message: 'Movement update was successful.', data: updateCashFlowMovementService}).code(202);
    }
}