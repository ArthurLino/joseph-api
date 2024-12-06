import prismaClient from "../prisma";
import bcrypt from 'bcrypt-ts';
import jwt from 'jsonwebtoken';

export type AuthServiceProps = {
    name: string;
    email: string;
    password: string;
}

export class AuthService {
    async signUp({name, email, password}: AuthServiceProps) {
        const userExists = await prismaClient.user.findUnique({ where: { email: email } })

        if (userExists) throw new Error('User already exists.');

        password = await bcrypt.hash(password, 10);

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password
            }
        })

        return user
        
    }

    async login({email, password}: {email: string, password: string}) {
        const user = await prismaClient.user.findUnique({ where: { email: email } })
        if (!user) throw new Error('User not found.')

        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (user.password !== password || !isPasswordValid) throw new Error('Invalid password.')

        if (!process.env.JWT_SECRET) throw new Error('Something went wrong. Try again later.')
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' })

        return {token, user}
    }
}