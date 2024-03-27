import Articulos from "../models/Articulos.js";
import mongoose from "mongoose";

const verArticulos = async (req, res) => {
  const articulos = await Articulos.find();
  res.json(articulos);
};

const agregarArticulo = async (req, res) => {
  const { codigo, nombre, precio_uni } = req.body;
  //articulo.reparto = req.reparto._id;
  try {
    const articuloAlmacenado = new Articulos({
      codigo,
      nombre,
      precio_uni,
    });
    await articuloAlmacenado.save();
    res.json(`${nombre} guardado`);
  } catch (error) {
    console.log(error);
  }
};

const actualizarArticulo = async (req, res) => {
  try {
    const { _id } = req.params;
    const { codigo, nombre, estado, precio_uni } = req.body;

    // Verificar si el _id es un ObjectId válido
    if (!mongoose.isValidObjectId(_id)) {
      return res
        .status(400)
        .json({ error: "El ID proporcionado no es válido." });
    }

    // Verificar si el artículo existe
    const articuloExistente = await Articulos.findById(_id);
    if (!articuloExistente) {
      return res.status(404).json({ error: "El artículo no existe." });
    }

    // Actualizar el artículo
    await Articulos.findByIdAndUpdate(
      _id,
      { $set: { codigo, nombre, estado, precio_uni } },
      { useFindAndModify: false }
    );

    res.send(`${nombre} actualizado`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud." });
  }
};

// const actualizarArticulo = async (req, res) => {
//   const { _id } = req.params;
//   const { codigo, nombre, estado, precio_uni } = req.body;

//   await Articulos.findByIdAndUpdate(
//     _id,
//     {
//       $set: { codigo, nombre, estado, precio_uni },
//     },
//     { useFindAndModify: false }
//   );
//   res.send(`${nombre} actualizado`);
// };

const eliminarArticulo = async (req, res) => {
  const { _id } = req.params;

  await Articulos.findByIdAndDelete(_id);
  res.send("articulo eliminado");
};

export { verArticulos, agregarArticulo, actualizarArticulo, eliminarArticulo };
