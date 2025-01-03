const ListCategoriesSchema = {
    querystring: {
        type: 'object',
        properties: {
            skip: { type: 'integer' },
            take: { type: 'integer' },
        },
        additionalProperties: false,
    }
}

const CreateCategorySchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
        },
        required: ['name'],
        additionalProperties: false,
    }
};

const UpdateCategorySchema = {
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
        },
        additionalProperties: false
    }
};

const DeleteCategorySchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        },
        additionalProperties: false,
    }
};

export { CreateCategorySchema, ListCategoriesSchema, UpdateCategorySchema, DeleteCategorySchema };