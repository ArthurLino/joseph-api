import { FastifyReply } from "fastify";
import { ListCategoriesService } from "@categoryServices";
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { ListCategoriesQueryValues } from "@services/CashFlowCategory/ListCategoriesService";

export class ListCategoriesController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as string;
        const query = request.query as { [key: string]: ListCategoriesQueryValues };
        const { id } = request.params as { id: string };

        const listCategoriesService = new ListCategoriesService();
        const categoriesList = await listCategoriesService.execute({ 
            authorId, 
            query,
            params: { id },
        });

        reply.send(categoriesList).code(200);
    }
}