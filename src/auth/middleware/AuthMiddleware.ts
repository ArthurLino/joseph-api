import { FastifyReply, FastifyRequest, preHandlerAsyncHookHandler } from "fastify";
import { AuthService } from "../AuthService";

type UserRequest = FastifyRequest & { user?: {id: string, email: string} };

export const AuthMiddleware = (request: UserRequest, reply: FastifyReply) => {
    const token = request.headers.authorization?.replace(/^Bearer/, "");

    if (!token) return reply.status(401).send({ error: 'Access Denied' });
    console.log(token)

    try {
        const tokenVerificator = new AuthService();
        const decodedToken = tokenVerificator.verifyToken(token);
        console.log(decodedToken)
        if (!decodedToken) return reply.status(404).send({ error: 'Invalid Token' });
        request.user = decodedToken;
    } catch (error) {
        reply.status(400).send({ error: 'Invalid Token' });
    }
}
