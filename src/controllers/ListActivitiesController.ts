import { FastifyReply } from "fastify";
import { CashFlowActivity } from "@prisma/client";
import { ListCashFlowActivitiesService } from "@services/ListActivitiesService"
import { AuthenticatedUserRequest } from "@auth/AuthValidation";

export class ListActivitiesController {
    async handle(request: AuthenticatedUserRequest, reply: FastifyReply) {
        
        const authorId = request.user.id as CashFlowActivity["authorId"];
        
        const listActivitiesService = new ListCashFlowActivitiesService();

        const query = request.query as { [key: string]: any };

        if ( query && Object.keys(query).length > 0 ) {

            const hasValidKeys = Object.keys(query).map( key => { 
                
                if ( !query[key] ) return false

                return ["type", "date", "from", "to", "category"].includes(key) ? true : false 

            })

            if ( hasValidKeys.includes(false) ) return reply.code(400).send({ error: "Invalid query parameters." })

        }

        const activitiesList = await listActivitiesService.execute(authorId, request.query as { 
            type: string;
            date: Date;
            from: Date;
            to: Date;
            category: string;
        });        

        reply.code(200).send(activitiesList) 
    }
}