import { ObjectId } from "mongodb";
import prismaClient from "@prismaClient";

export class DeleteActivityService {
    async execute({ authorId, id }: { authorId: string; id: string; }) {

        if ( !ObjectId.isValid(id) || !authorId ) throw new Error('Missing request data.');
        
        const activityExists = await prismaClient.cashFlowActivity.findFirst({where: {id, authorID: authorId}});

        if (!activityExists) throw new Error('Activity not found.');

        try {
            
            const deletedActivity = await prismaClient.cashFlowActivity.delete({ where: { authorID: authorId, id } });

            return deletedActivity;

        } catch (error) {

            throw new Error(`Cannot complete operation.\n ${error}`);
            
        }

    }
}