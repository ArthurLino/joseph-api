import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { UpdateUserBalanceService } from "src/services/User/UpdateUserBalance";
import { FastifyReply } from "fastify";

export class UpdateUserBalanceController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {

        const userId = request.user.id as string;

        const updatedBalance = new UpdateUserBalanceService().execute({ userId });
        
        reply.send(updatedBalance).code(200);
    }
}