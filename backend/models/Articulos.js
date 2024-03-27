import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const articulosSchema = mongoose.Schema(
  {
    codigo: {
      type: Number,
      require: true,
    },
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    // estado: {
    //   type: Boolean,
    // },
    precio_uni: {
      type: Number,
      require: true,
      trim: true,
    },
    reparto: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reparto",
        autopopulate: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
articulosSchema.plugin(autopopulate);

const Articulos = mongoose.model("Articulos", articulosSchema);

export default Articulos;
