export const addRequiredValidation = (schema, fields) => {
    fields.forEach(field => {
        if (!schema.path(field)) return;
        schema.path(field).required(true, `${field} is required`);
    });
}