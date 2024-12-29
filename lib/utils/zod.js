export function zodValidator(schema, data) {
  return schema.safeParse(data);
}
