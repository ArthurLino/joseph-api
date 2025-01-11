const CreateCreditCardSchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            limit: { type: 'number' },
            billDueDay: { type: 'integer' },
            billClosingDay: { type: 'integer' },
            brand: { type: 'string' },
            bankAccountId: { type: 'string' },
        },
        required: ['name', 'limit', 'billDueDay', 'billClosingDay', 'brand', 'bankAccountId'],
        additionalProperties: false,
    },
}

const UpdateCreditCardSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        },
        additionalProperties: false,
    },
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            limit: { type: 'number' },
            billDueDay: { type: 'integer' },
            billClosingDay: { type: 'integer' },
            brand: { type: 'string' },
            bankAccountId: { type: 'string' },
        },
        additionalProperties: false,
    }
}

const ListCreditCardsSchema = {
    querystring: {
        type: 'object',
        properties: {
            skip: { type: 'integer' },
            take: { type: 'integer' },
        },
        additionalProperties: false,
    }
}

const ListCreditCardSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        },
        additionalProperties: false,
    }
};

const DeleteCreditCardSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id'],
        additionalProperties: false,
    }
}

export { CreateCreditCardSchema, UpdateCreditCardSchema, ListCreditCardsSchema, ListCreditCardSchema, DeleteCreditCardSchema };
