import prismaClient from "../prisma";
import { FinancialMovementType, FinancialMovement } from "@prisma/client"

type CreateFinancialMovementServiceProps = {
    authorId: FinancialMovement["authorId"];
    type: FinancialMovementType
    value: number;
    categories: string[];
    notes?: string;
    date?: Date;
}

export class CreateFinancialMovementService {
    async handle({authorId, type, value, categories, notes, date}: CreateFinancialMovementServiceProps) {

        if ( !authorId || !value || !type || !categories ) throw new Error('Missing request data.')

        const financialMovement = await prismaClient.financialMovement.create({
            data: {
                authorId,
                type,
                value,
                notes,
                date,
                // categories
            }
        });

        return financialMovement
    }
}