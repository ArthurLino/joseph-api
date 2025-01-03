import { FastifyReply } from "fastify";
import { ListActivitiesService } from "@activityServices"
import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { ListActivitiesQueryValues } from "src/services/CashFlowActivity/ListActivitiesService";

export class ListActivitiesController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as string;

        const query = request.query as { [key: string]: ListActivitiesQueryValues };
        
        const listActivitiesService = new ListActivitiesService();
        const activitiesList = await listActivitiesService.execute({
            authorId, 
            query
        });        

        reply.send(activitiesList).code(200);
    }
}