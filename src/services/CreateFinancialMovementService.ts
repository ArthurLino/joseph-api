//id        String   @id @default(auto()) @map("_id") @db.ObjectId
        // authorId  String @db.ObjectId
        // author    User     @relation(fields: [authorId], references: [id])
        // value     Float
        // categories String[]
        // notes     String?
        // date      DateTime @default(now())

import prismaClient from "../prisma";

type FinancialMovementType = 'INCOME' | 'EXPENSE';

type CreateFinancialMovementServiceProps = {
    authorId: string;
    type: FinancialMovementType
    value: number;
    categories: string[];
    notes?: string;
    date: string;
}

export class CreateFinancialMovementService {
    async handle({authorId, type, value, categories, notes, date}: CreateFinancialMovementServiceProps) {
        
        if ( !authorId || !value || !categories || !date ) {
            throw new Error('Missing request data.')
        }

        const financialMovement = prismaClient.financialMovement.create({
            data: {
                authorId,
                type,
                value,
                categories,
                notes,
                date
            }
        });

        return financialMovement
    }
}