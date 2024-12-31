import { FastifyReply } from "fastify";
import { ListCategoriesService } from "@categoryServices";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";

export class ListCategoriesController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as string;

        const listCategoriesService = new ListCategoriesService();
        const categoriesList = await listCategoriesService.execute({ authorId });

        reply.send(categoriesList).code(200);
    }
}