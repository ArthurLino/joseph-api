import { FastifyReply } from "fastify";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { CashFlowMovement } from "@prisma/client";
import { CreateCashFlowCategoryService } from "@services/CreateCashFlowCategory";

export class CreateCashFlowCategoryController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        const { name } = request.body as { name: string };
        const authorId = request.user.id as CashFlowMovement["authorId"];

        const createCashFlowCategoryService = new CreateCashFlowCategoryService();
        const cashFlowCategory = await createCashFlowCategoryService.execute({
            name,
            authorId
        });
        
        return reply.code(201).send({"message": "New category created.", cashFlowCategory});
    }
}