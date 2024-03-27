import join from "@hapi/joi";

const repartoSchema = join.object({
  //nombre: join.string().required(),
  fecha: join.date().required(),
  cod_personal: join.number().required(),
  cod_localidades: join.number().required(),
  precio: join.number().required(),
  cantidad: join.number().required(),
  devuelve: join.number(),
  cod_orden: join.number().required(),
  cliente: join.string().required(),
  articulo: join.array().items(join.string()).required(),
});

export default repartoSchema;
