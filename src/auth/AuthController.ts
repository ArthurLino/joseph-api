import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService,  } from "@auth/AuthService";
import { AuthenticatedUserRequest, AuthValidation } from "./AuthValidation";
import e from "cors";

export class AuthController {
    async handleSignUp(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password } = request.body as {name: string, email: string, password: string};

        if ( !name || !email || !password ) {
            return reply.code(400).send({"message": "Missing request data."});
        }

        const authService = new AuthService();

        const user = await authService.signUp({name, email, password} as {name: string, email: string, password: string});

        reply.send({"message": "User created successfully.", user: {id: user.id, name: user.name, email: user.email}}).code(201);
    }

    async handleLogin(request: FastifyRequest, reply: FastifyReply) {

        const { email, password } = request.body as {email: string, password: string};

        if ( !email || !password ) {
            return reply.code(400).send({"message": "Missing request data."});
        }

        const authService = new AuthService();

        const { token, user } = await authService.login({email, password} as {email: string, password: string});

        reply.setCookie('auth', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day 
        }).send({
            "message": "User logged in successfully.", 
            user: {
                id: user.id,
                name: user.name
            } 
        }).code(200);
    }

    async handleLogout(request: AuthenticatedUserRequest, reply: FastifyReply) {
        reply.clearCookie('auth', {
            path: '/'
        }).send({"message": "User logged out successfully."}).code(200)
    }
}