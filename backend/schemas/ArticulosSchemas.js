import Join from "@hapi/joi";

const articuloSchema = Join.object({
  codigo: Join.number().required(),
  nombre: Join.string().required(),
  //estado: Join.boolean(),
  precio_uni: Join.number().required(),
});

export default articuloSchema;
