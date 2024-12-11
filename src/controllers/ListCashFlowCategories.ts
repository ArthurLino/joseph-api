import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { ListCashFlowCategoriesService } from "@services/ListCashFlowCategories";
import { FastifyReply } from "fastify";

export class ListCashFlowCategoriesController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        const authorId = request.user.id as string;

        const listCashFlowCategoriesService = new ListCashFlowCategoriesService();

        const cashFlowCategoriesList = await listCashFlowCategoriesService.execute({authorId});

        reply.code(200).send(cashFlowCategoriesList);
    }
}