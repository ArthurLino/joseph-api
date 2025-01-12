import { FastifyReply, FastifyRequest } from "fastify"
import { AuthValidation } from "@auth/AuthValidation"

export const authValidationHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    await AuthValidation(request, reply)
}