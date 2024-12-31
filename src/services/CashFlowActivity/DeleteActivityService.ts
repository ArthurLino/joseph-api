import prismaClient from "@prismaClient";
import { ObjectId } from "mongodb";

type DeleteActivityServiceProps = { 
    authorId: string; 
    id: string;
};

export class DeleteActivityService {
    async execute({ authorId, id }: DeleteActivityServiceProps) {

        if ( !ObjectId.isValid(id) || !ObjectId.isValid(authorId) ) throw new Error('Missing request data.');
        
        const activityExists = await prismaClient.cashFlowActivity.findFirst({where: {authorID: authorId, id}});

        if (!activityExists) throw new Error('Activity not found.');

        try {
            
            const deletedActivity = await prismaClient.cashFlowActivity.delete({ where: { authorID: authorId, id } });

            return deletedActivity;

        } catch (error) {

            throw new Error(`Cannot complete operation.\n ${error}`);
            
        }

    }
}