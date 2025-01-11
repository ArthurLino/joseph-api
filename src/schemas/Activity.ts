const ListActivitiesSchema = {
    querystring: {
        type: 'object',
        properties: {
            type: { type: 'string' },
            date: { type: 'string' },
            from: { type: 'string' },
            to: { type: 'string' },
            categories: { 
                oneOf: [
                    { type: 'array', items: { type: 'string' } },
                    { type: 'string' }
                ]
            },
            skip: { type: 'integer' },
            take: { type: 'integer' },
        },
        additionalProperties: false,
    }
}

const ListActivitySchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        },
        additionalProperties: false,
    }
};

const CreateActivitySchema = {
    body: {
        type: 'object',
        required: ['type', 'value'],
        properties: {
            type: { type: 'string' },
            value: { type: 'number' },
            bankAccountId: { type: 'string' },
            paymentMethod: { type: 'string' },
            creditCardId: { type: 'string' },
            categories: { type: 'array', items: { type: 'string' } },
            notes: { type: 'string' },
            date: { type: 'string' },
        },
        additionalProperties: false
    }
}

const UpdateActivitySchema = {
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
            type: { type: 'string' },
            value: { type: 'number' },
            bankAccountId: { type: 'string' },
            paymentMethod: { type: 'string' },
            creditCardId: { type: 'string' },
            categories: { type: 'array', items: { type: 'string' } },
            notes: { type: 'string' },
            date: { type: 'string' },
        },
        additionalProperties: false
    }
}

const DeleteActivitySchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        },
        additionalProperties: false,
    }
}

export { ListActivitiesSchema, ListActivitySchema, CreateActivitySchema, UpdateActivitySchema, DeleteActivitySchema };
