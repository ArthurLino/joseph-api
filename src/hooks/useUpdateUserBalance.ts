import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import { FastifyReply } from "fastify";
import { UpdateUserBalanceController } from "src/controllers/User/UpdateUserBalance";

const useUpdateUserBalance = async (request: AuthenticatedUserRequest, reply: FastifyReply) => {
    await new UpdateUserBalanceController().handle(request, reply)
}

export default useUpdateUserBalance;