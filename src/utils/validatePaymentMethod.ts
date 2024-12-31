import { PaymentMethod } from "@prisma/client";

const validatePaymentMethod = (paymentMethod: string | undefined): false | PaymentMethod => {
    if ( !paymentMethod ) return false;

    const formattedPaymentMethod = paymentMethod.trim().toUpperCase().replace(" ", "_") as PaymentMethod;

    if ( !Object.values(PaymentMethod).includes(formattedPaymentMethod)) return false;

    return formattedPaymentMethod;
}

export default validatePaymentMethod;