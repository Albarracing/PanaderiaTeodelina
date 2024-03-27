import express from "express";
import validationMiddleware from "../middlewares/validateData.js";
import repartoSchema from "../schemas/RepartosSchemas.js";
import {
  crearReparto,
  actualizarReparto,
  verRepartos,
  eliminarReparto,
  eliminarArticulo,
} from "../controllers/RepartosControllers.js";

const router = express.Router();

router.get("/", verRepartos);
router.post("/", validationMiddleware(repartoSchema), crearReparto);
router.put("/:_id", validationMiddleware(repartoSchema), actualizarReparto);
// router.put("/asignarCliente/:_id", asignarcliente);
// router.put("/eliminarCliente/:_id", eliminarCliente);
//router.put("/asignarArticulo/:_id", asignarArticulo);
router.put("/eliminarArtiuclo/:_id", eliminarArticulo);
router.delete("/:_id", eliminarReparto);

export default router;
