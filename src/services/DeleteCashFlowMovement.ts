import { ObjectId } from "mongodb";
import prismaClient from "../prisma";

export class DeleteCashFlowMovementService {
    async execute({ authorId, id }: { authorId: string; id: string; }) {

        if ( !ObjectId.isValid(id) ) throw new Error("Invalid id.");
        
        try {
            
            const deletedMovement = await prismaClient.cashFlowMovement.delete({
                where: {
                    authorId: authorId,
                    id: id
                }
            });

            console.log(deletedMovement);

            return deletedMovement;

        } catch (error) {
            throw new Error(`Cannot complete operation.`);
        }

    }
}