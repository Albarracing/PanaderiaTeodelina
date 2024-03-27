import React from "react";
import FormularioCliente from "../componentes/FormularioCliente";
import ListadoDeClientes from "../componentes/ListadoDeClientes";

const Clientes = () => {
  return (
    <div className="flex">
      <div className="px-10">
        <FormularioCliente />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoDeClientes />
      </div>
    </div>
  );
};

export default Clientes;
