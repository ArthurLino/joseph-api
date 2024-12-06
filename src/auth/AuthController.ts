import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./AuthService";

export class AuthController {
    async handleSignUp(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password } = request.body as {name: string, email: string, password: string};

        if ( !name || !email || !password ) {
            return reply.code(400).send({"message": "Missing request data."});
        }

        const authService = new AuthService();

        const user = await authService.signUp({name, email, password} as {name: string, email: string, password: string});

        console.log('Signing up...')
        reply.send({"message": "User created successfully.", user}).code(201);

    }

    async handleLogin(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as {email: string, password: string};

        if ( !email || !password ) {
            return reply.code(400).send({"message": "Missing request data."});
        }

        const authService = new AuthService();

        const { token, user } = await authService.login({email, password} as {email: string, password: string});

        console.log('Logging in...')
        reply.send({"message": "User logged in successfully.", user, token}).code(200);
    }
}