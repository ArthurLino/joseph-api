import prismaClient from "@prismaClient";

export class UpdateUserBalanceService {
    async execute({ userId }: { userId: string }) {

        if ( !userId ) throw new Error('Missing request data.');

        const user = await prismaClient.user.findUnique({
            where: { id: userId },
            select: {
                name: true,
            }
        });

        if (!user) throw new Error('User not found.');

        const userBalance = await prismaClient.cashFlowActivity.groupBy({
            by: ['type'],
            where: {
                authorID: userId
            }, 
            _sum: {
                value: true,
            }
        })

        const balance = userBalance.reduce((acc, activity) => {
            if (activity.type === 'INCOME') {
                return acc + (activity._sum.value ?? 0);
            } else {
                return acc - (activity._sum.value ?? 0);
            }
        }, 0);

        const updatedUser = await prismaClient.user.update({ 
            where: {
                id: userId
            }, 
            data: {
                balance
            }
        });

        return updatedUser;
    }
}