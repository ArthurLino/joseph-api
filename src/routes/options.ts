import { FastifyReply, FastifyRequest } from "fastify"
import { AuthMiddleware } from "../auth/middleware/AuthMiddleware"

export const authOptions = {
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
        await AuthMiddleware(request, reply)
    }
}