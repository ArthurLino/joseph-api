import prismaClient from "../prisma";
import { FinancialMovementType, FinancialMovement } from "@prisma/client"

type CreateFinancialMovementServiceProps = {
    authorId: FinancialMovement["authorId"];
    type: FinancialMovementType
    value: number;
    categories: string[];
    notes?: string;
}

export class CreateFinancialMovementService {
    async handle({authorId, type, value, categories, notes}: CreateFinancialMovementServiceProps) {
        
        // if ( !authorId || !value || !categories || !type ) {
        //     throw new Error('Missing request data.')
        // }

        // const financialMovement = prismaClient.financialMovement.create({
        //     data: {
        //         authorId,
        //         type,
        //         value,
        //         categories,
        //         notes
        //     }
        // });

        // return financialMovement

        return { message: 'hello world!' };
    }
}