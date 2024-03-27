import Join from "@hapi/joi";

const clienteSchema = Join.object({
  nombre: Join.string().required(),
  apellido: Join.string().required(),
  fecha_alta: Join.date().required(),
  // anulado: Join.boolean(),
  direccion: Join.string().required(),
  celular: Join.number(),
});

export default clienteSchema;
