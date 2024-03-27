import Repartos from "../models/Repartos.js";

const verRepartos = async (req, res) => {
  const reparto = await Repartos.find();
  res.json(reparto);
};

const crearReparto = async (req, res) => {
  const {
    fecha,
    cod_personal,
    cod_localidades,
    precio,
    cantidad,
    devuelve,
    cod_orden,
    cliente,
    articulo,
  } = req.body;

  try {
    const repartoAlmacenado = new Repartos({
      fecha,
      cod_personal,
      cod_localidades,
      precio,
      cantidad,
      devuelve,
      cod_orden,
      cliente: [cliente], // Puedes inicializar con el cliente proporcionado
      articulo: [articulo], // Puedes inicializar con el artículo proporcionado
    });

    await repartoAlmacenado.save();
    res.json("Reparto almacenado con cliente y artículo asignados");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const actualizarReparto = async (req, res) => {
  const { _id } = req.params;
  const {
    fecha,
    cod_personal,
    cod_localidades,
    precio,
    cantidad,
    devuelve,
    cod_orden,
    cliente,
    articulo,
  } = req.body;

  try {
    // Obtener el reparto actual
    const reparto = await Repartos.findById(_id);

    // Verificar si el reparto existe
    if (!reparto) {
      return res.status(404).send("Reparto no encontrado");
    }

    // Actualizar los campos del reparto
    reparto.fecha = fecha;
    reparto.cod_personal = cod_personal;
    reparto.cod_localidades = cod_localidades;
    reparto.precio = precio;
    reparto.cantidad = cantidad;
    reparto.devuelve = devuelve;
    reparto.cod_orden = cod_orden;

    // Asignar nuevos clientes
    if (cliente) {
      reparto.cliente = reparto.cliente.concat(cliente);
    }

    // Asignar nuevos artículos
    if (articulo) {
      reparto.articulo = reparto.articulo.concat(articulo);
    }

    // Guardar el reparto actualizado
    await reparto.save();

    res.send(`Reparto actualizado`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const eliminarReparto = async (req, res) => {
  const { _id } = req.params;

  await Repartos.findByIdAndDelete(_id);
  res.send("Reparto eliminado");
};

const eliminarArticulo = async (req, res) => {
  const { _id } = req.params;
  const { articulo } = req.body;
  const repartoactualizado = await Repartos.findByIdAndUpdate(_id, {
    $pull: { articulo: articulo },
  });
  res.send(`${repartoactualizado} actualizado`);
};

export {
  verRepartos,
  crearReparto,
  actualizarReparto,
  eliminarReparto,
  eliminarArticulo,
};
