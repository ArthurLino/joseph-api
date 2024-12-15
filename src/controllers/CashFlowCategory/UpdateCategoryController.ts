import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { UpdateCashFlowCategoryService } from "@categoryServices/UpdateCategoryService";
import { FastifyReply } from "fastify";

export class UpdateCategoryController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
    
        const authorId = request.user.id as string;

        const { id } = request.params as { id: string };

        const { name } = request.body as { name: string };

        const updatedCategory = await new UpdateCashFlowCategoryService().execute({ authorId, id, name });
        return reply.code(200).send(updatedCategory);
    }
}