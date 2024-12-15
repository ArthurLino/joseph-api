import { FastifyReply } from "fastify";
import { CashFlowActivity } from "@prisma/client";
import { CreateCategoryService } from "@services/CreateCategoryService";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";

export class CreateCategoryController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        const { name } = request.body as { name: string };
        const authorId = request.user.id as CashFlowActivity["authorId"];

        const createCategoryService = new CreateCategoryService();
        const category = await createCategoryService.execute({
            name,
            authorId
        });
        
        return reply.code(201).send({"message": "New category created.", category});
    }
}