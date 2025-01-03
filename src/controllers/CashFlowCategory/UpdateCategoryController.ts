import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { UpdateCategoryService } from "@categoryServices";
import { FastifyReply } from "fastify";

export class UpdateCategoryController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
    
        const authorId = request.user.id as string;

        const { id } = request.params as { id: string };
        const { name } = request.body as { name: string };

        const updateCategoryService = new UpdateCategoryService()
        const updatedCategory = await updateCategoryService.execute({ 
            authorId, 
            id, 
            name 
        });

        return reply.send(updatedCategory).code(200);
    }
}