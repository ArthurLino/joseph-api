const CreateBankAccountSchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            balance: { type: 'number' },
        },
        required: ['name'],
        additionalProperties: false,
    }
};

const UpdateBankAccountSchema = {
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
            balance: { type: 'number' },
        },
        additionalProperties: false
    }
};

const ListBankAccountsSchema = {
    querystring: {
        type: 'object',
        properties: {
            skip: { type: 'integer' },
            take: { type: 'integer' },
        },
        additionalProperties: false,
    }
};

const DeleteBankAccountSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        },
        additionalProperties: false,
    }
};

export { CreateBankAccountSchema, UpdateBankAccountSchema, ListBankAccountsSchema, DeleteBankAccountSchema };