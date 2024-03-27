import express from "express";
import validationMiddleware from "../middlewares/validateData.js";
import clienteSchema from "../schemas/ClientesSchemas.js";
import {
  verCliente,
  registrar,
  actualizarCliente,
  eliminarCliente,
} from "../controllers/ClientesControllers.js";

const router = express.Router();

router.get("/", verCliente);
router.post("/", validationMiddleware(clienteSchema), registrar);
router.put("/:_id", validationMiddleware(clienteSchema), actualizarCliente);
router.delete("/:_id", eliminarCliente);
export default router;
