import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "@auth/AuthService";
import { JwtPayload } from "jsonwebtoken";

export type AuthenticatedUserRequest = FastifyRequest & JwtPayload;

export const AuthValidation = (request: AuthenticatedUserRequest, reply: FastifyReply) => {
    const token = request.headers.authorization?.replace(/^Bearer /, "");

    if (!token) return reply.status(401).send({ error: 'Access Denied' });

    try {
        const decodedToken = new AuthService().verifyToken(token);
        if (!decodedToken) return reply.status(404).send({ error: 'Invalid Token' });
        request.user = decodedToken;
    } catch (error) {
        reply.status(400).send({ error: 'Invalid Token' });
    }
}
