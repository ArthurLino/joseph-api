import { FastifyReply, FastifyRequest } from "fastify"
import { AuthValidation } from "@auth/AuthValidation"

const authHook = async (request: FastifyRequest, reply: FastifyReply) => {
    await AuthValidation(request, reply)
}

export default authHook