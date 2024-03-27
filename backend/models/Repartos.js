import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
const RepartoSchema = mongoose.Schema(
  {
    fecha: {
      type: Date,
      require: true,
    },

    cod_personal: {
      type: Number,
      require: true,
    },
    cod_localidades: {
      type: Number,
      require: true,
    },
    precio: {
      type: Number,
      require: true,
    },
    cantidad: {
      type: Number,
      require: true,
    },
    devuelve: {
      type: Number,
    },
    cod_orden: {
      type: Number,
      require: true,
    },
    cliente: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Cliente",
        autopopulate: true,
      },
    ],
    articulo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articulos",
        autopopulate: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

RepartoSchema.plugin(autopopulate);

const Reparto = mongoose.model("Reparto", RepartoSchema);

export default Reparto;
