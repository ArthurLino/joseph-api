import prismaClient from "../prisma";
import { ObjectId } from "mongodb";

export class DeleteCashFlowActivityService {
    async execute({ authorId, id }: { authorId: string; id: string; }) {

        if ( !ObjectId.isValid(id) || !authorId ) throw new Error('Missing request data.');
        
        try {
            
            const deletedActivity = await prismaClient.cashFlowActivity.delete({
                where: {
                    authorId: authorId,
                    id: id
                }
            });

            return deletedActivity;

        } catch (error) {
            throw new Error(`Cannot complete operation.`);
        }

    }
}