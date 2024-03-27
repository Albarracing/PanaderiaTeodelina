import mongoose from "mongoose";

const clientesSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  apellido: {
    type: String,
    require: true,
    trim: true,
  },
  fecha_alta: {
    type: Date,
    require: true,
  },
  // anulado: {
  //   type: Boolean,
  // },
  direccion: {
    type: String,
    require: true,
    trim: true,
  },
  celular: {
    type: Number,
    trim: true,
  },
});

const Cliente = mongoose.model("Cliente", clientesSchema);

export default Cliente;
