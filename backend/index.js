import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import clientesRoutes from "./routes/ClientesRoutes.js";
import articulosRoutes from "./routes/ArticulosRoutes.js";
import repartosRoutes from "./routes/RepartosRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
conectarDB();

app.use("/api/clientes", clientesRoutes);
app.use("/api/articulos", articulosRoutes);
app.use("/api/repartos", repartosRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
