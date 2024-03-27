import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { data } from "autoprefixer";

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/clientes/");
        setClientes(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerClientes();
  }, []);

  const guardarCliente = async (cliente) => {
    // if (cliente.id) {
    //   try {
    //     const { data } = await axios.put(
    //       `http://localhost:4000/api/clientes/${cliente.id}`,
    //       cliente
    //     );
    //     const clienteActualizado = cliente.map((clienteState) =>
    //       clienteState._id === data._id ? data : clienteState
    //     );
    //     setCliente(clienteActualizado);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    // setError(null);

    // let data;

    // if (cliente._id) {
    //   // Actualización de cliente existente
    //   const response = await axios.put(
    //     `http://localhost:4000/api/clientes/${cliente._id}`,
    //     cliente
    //   );
    //   data = response.data;
    // } else {
    // Creación de un nuevo cliente
    try {
      const response = await axios.post(
        "http://localhost:4000/api/clientes/",
        cliente
      );
      const { createdAt, updateAt, __v, ...ClienteGuardado } = response;
      setCliente([ClienteGuardado, ...clientes]);
    } catch (error) {
      console.error(error.response.msg);
      const { errors } = error.response.data;
      console.log(errors);
    }
  };
  //};
  //data = response.data;
  //}

  // Verificar si la respuesta del servidor contiene datos
  // if (data) {
  //   // Actualizar el estado de clientes
  //   setClientes((clientes) => {
  //     // Si estamos actualizando, actualizamos el cliente existente
  //     if (cliente._id) {
  //       return clientes.map((clienteState) =>
  //         clienteState._id === data._id ? data : clienteState
  //       );
  //     } else {
  //       // Si estamos creando, agregamos el nuevo cliente al inicio del array
  //       return [data, ...clientes];
  //     }
  //   });
  // }

  //   if (cliente._id) {
  //     setError("Error al actualizar el cliente");
  //   } else {
  //     setError(error.response?.data?.msg || "Error al crear el cliente");
  //   }

  // const guardarCliente = async (cliente) => {
  //
  //   try {
  //     // Resetear el estado de error al intentar guardar un cliente
  //     setError(null);

  //     if (cliente._id) {
  //       const { data } = await axios.put(
  //         `http://localhost:4000/api/clientes/${cliente._id}`,
  //         cliente
  //       );

  //       // Optimización: Actualizar solo el cliente que ha sido modificado
  //       //setClientes((clientes) =>
  //       const clienteActualizado = clientes.map((clienteState) =>
  //         clienteState._id === data._id ? data : clienteState
  //       );
  //       setClientes(clienteActualizado);

  //       //);
  //     } else {
  //       try {
  //         const { data } = await axios.post(
  //           "http://localhost:4000/api/clientes/",
  //           { ...cliente, id: undefined }
  //         );
  //         console.log("Cliente creado:", data);
  //       } catch (error) {
  //         console.error("Error al crear el cliente:", error.response.data);
  //       }
  //       // Optimización: Extraer propiedades innecesarias de la respuesta del servidor
  //       const { createdAt, updatedAt, __v, ...clienteAlmacenado } = data;

  //       // Optimización: Agregar el nuevo cliente al inicio del array
  //       setClientes([clienteAlmacenado, ...clientes]);
  //     }
  //   } catch (error) {
  //     console.error(error);

  //     // Manejar errores específicos según el tipo de operación (actualización o creación)
  //     if (cliente._id) {
  //       setError("Error al actualizar el cliente");
  //     } else {
  //       setError(error.response.data.msg || "Error al crear el cliente");
  //     }
  //   }
  // };

  // ...

  // En tu componente, puedes mostrar el mensaje de error si `error` no es nulo.

  const setEditando = (cliente) => {
    setCliente(cliente);
  };

  const eliminarCliente = async (id) => {
    const confirmar = confirm("Seguro que deseas eliminar?");

    if (confirmar) {
      try {
        const { data } = await axios.delete(
          `http://localhost:4000/api/clientes/${id}`
        );
        const clientesActualizados = clientes.filter(
          (clienteState) => clienteState._id !== id
        );
        setClientes(clientesActualizados);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <ClientesContext.Provider
      value={{
        clientes,
        guardarCliente,
        setEditando,
        cliente,
        eliminarCliente,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export default ClientesContext;
