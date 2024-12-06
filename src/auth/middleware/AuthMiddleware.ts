import { FastifyReply, FastifyRequest, preHandlerAsyncHookHandler } from "fastify";
import { AuthService } from "../AuthService";
import { JwtPayload } from "jsonwebtoken";

type UserRequest = FastifyRequest & JwtPayload;
// type UserRequest = FastifyRequest & { user?: {id: string, email: string} };

export const AuthMiddleware = (request: UserRequest, reply: FastifyReply) => {
    const token = request.headers.authorization?.replace(/^Bearer /, "");

    if (!token) return reply.status(401).send({ error: 'Access Denied' });

    try {
        const decodedToken = new AuthService().verifyToken(token);
        if (!decodedToken) return reply.status(404).send({ error: 'Invalid Token' });
        console.log(decodedToken);
        request.user = decodedToken;
    } catch (error) {
        reply.status(400).send({ error: 'Invalid Token' });
    }
}
