import { FastifyReply, FastifyRequest } from "fastify"
import { AuthValidation } from "@auth/AuthValidation"

const useAuthValidation = async (request: FastifyRequest, reply: FastifyReply) => {
    await AuthValidation(request, reply)
}

export default useAuthValidation