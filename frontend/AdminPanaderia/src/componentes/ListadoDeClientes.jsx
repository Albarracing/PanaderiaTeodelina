import useClientes from "../hook/useClientes";
import Cliente from "./Cliente";

const ListadoDeClientes = () => {
  const { clientes } = useClientes();
  // console.log(clientes);

  return (
    <>
      {clientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado de clientes
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">clientes </span>
          </p>

          {clientes.map((cliente) => (
            <Cliente key={cliente._id} cliente={cliente} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay clientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando clientes {""}
            <span className="text-indigo-600 font-bold">
              y apareceran en este lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default ListadoDeClientes;
