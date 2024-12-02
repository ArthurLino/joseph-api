import prismaClient from "../prisma"

export type CreateUserServiceProps = {
    name: string;
    email: string;
}
export class CreateUserService {
    async handle({name, email}: CreateUserServiceProps) {

        if ( !name || !email ) {
            throw new Error('Missing request data.')
        }

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
            }
        })

        console.log('Creating user...')

        return user
    }
}
