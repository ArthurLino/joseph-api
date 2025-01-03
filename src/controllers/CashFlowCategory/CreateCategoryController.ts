import { FastifyReply } from "fastify";
import { CreateCategoryService } from "@categoryServices";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";

export class CreateCategoryController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as string;

        const { name } = request.body as { name: string };

        const createCategoryService = new CreateCategoryService();
        const newCategory = await createCategoryService.execute({
            authorId,
            name
        });
        
        return reply.send({"message": "New category created.", newCategory}).code(201);
    }
}