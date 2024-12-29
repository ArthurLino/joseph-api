import { CashFlowActivityType } from "@prisma/client";

const validateActivityType = (activityType: string): false | CashFlowActivityType => {
    const formattedType = activityType.toUpperCase().trim() as CashFlowActivityType;

    if ( Object.values(CashFlowActivityType).includes(formattedType) ) return formattedType;

    return false;
}

export default validateActivityType;