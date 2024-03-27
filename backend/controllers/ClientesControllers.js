import Cliente from "../models/Clientes.js";
import mongoose from "mongoose";
const verCliente = async (req, res) => {
  const cliente = await Cliente.find();
  res.json(cliente);
};

const registrar = async (req, res) => {
  const { nombre, apellido, fecha_alta, direccion, celular } = req.body;

  try {
    //const cliente = new Cliente(req.body);
    const NewCliente = new Cliente({
      nombre,
      apellido,
      fecha_alta,
      //anulado,
      direccion,
      celular,
    });
    await NewCliente.save();

    res.json(`${nombre} ah sido guardado`);
  } catch (error) {
    console.log(error);
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const { _id } = req.params;
    const { nombre, apellido, fecha_alta, direccion, celular } = req.body;

    // Verificar si el _id es un ObjectId válido
    if (!mongoose.isValidObjectId(_id)) {
      return res
        .status(400)
        .json({ error: "El ID proporcionado no es válido." });
    }

    // Verificar si el cliente existe
    const clienteExistente = await Cliente.findById(_id);
    if (!clienteExistente) {
      return res.status(404).json({ error: "El cliente no existe." });
    }

    // Actualizar el cliente
    await Cliente.findByIdAndUpdate(
      _id,
      { $set: { nombre, apellido, fecha_alta, direccion, celular } },
      { useFindAndModify: false }
    );

    res.send(`${nombre} actualizado`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud." });
  }
};

// const actualizarCliente = async (req, res) => {
//   const { _id } = req.params;
//   const { nombre, fecha_alta, anulado, direccion, celular } = req.body;
//   await Cliente.findByIdAndUpdate(
//     _id,
//     {
//       $set: { nombre, fecha_alta, anulado, direccion, celular },
//     },
//     { useFindAndModify: false }
//   );
//   res.send(`${nombre} actualizado`);
// };

const eliminarCliente = async (req, res) => {
  const { _id } = req.params;

  await Cliente.findByIdAndDelete(_id);
  res.send("Cliente eliminado");
};
export { verCliente, registrar, actualizarCliente, eliminarCliente };
