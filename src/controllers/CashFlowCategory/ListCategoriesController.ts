import { FastifyReply } from "fastify";
import { ListCategoriesService } from "@categoryServices";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { ListCategoriesQueryValues } from "src/services/CashFlowCategory/ListCategoriesService";

export class ListCategoriesController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as string;
        const query = request.query as { [key: string]: ListCategoriesQueryValues };

        const listCategoriesService = new ListCategoriesService();
        const categoriesList = await listCategoriesService.execute({ authorId, query });

        reply.send(categoriesList).code(200);
    }
}