import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { data } from "autoprefixer";

const RepartosContext = createContext();

export const RepartosProvider = ({ children }) => {
  const [repartos, setRepartos] = useState([]);
  const [reparto, setReparto] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerRepartos = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/repartos/");
        setRepartos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerRepartos();
  }, []);

  const guardarReparto = async (reparto) => {
    if (reparto.id) {
      try {
        const { data } = await axios.put(
          `http://localhost:4000/api/repartos/${reparto.id}`,
          reparto
        );
        const repartoActualizado = reparto.map((repartoState) =>
          repartoState._id === data._id ? data : repartoState
        );
        setRepartos(repartoActualizado);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // Creación de un nuevo cliente
        const response = await axios.post(
          "http://localhost:4000/api/repartos/",
          reparto
        );

        const { createdAt, updateAt, __v, ...RepartoGuardado } = response;
        setRepartos([RepartoGuardado, ...repartos]);
        console.log(response);
      } catch (error) {
        console.error(error.response.msg);
      }
    }
  };

  // Verificar si la respuesta del servidor contiene datos
  //     if (data) {
  //       // Actualizar el estado de clientes
  //       setClientes((clientes) => {
  //         // Si estamos actualizando, actualizamos el cliente existente
  //         if (cliente._id) {
  //           return clientes.map((clienteState) =>
  //             clienteState._id === data._id ? data : clienteState
  //           );
  //         } else {
  //           // Si estamos creando, agregamos el nuevo cliente al inicio del array
  //           return [data, ...clientes];
  //         }
  //       });
  //     }

  //     if (cliente._id) {
  //       setError("Error al actualizar el cliente");
  //     } else {
  //       setError(error.response?.data?.msg || "Error al crear el cliente");
  //     }

  const setEditando = (reparto) => {
    setReparto(reparto);
    //console.log("editando", id);
  };

  const eliminarReparto = async (id) => {
    const confirmar = confirm("Seguro que deseas eliminar?");

    if (confirmar) {
      try {
        const { data } = await axios.delete(
          `http://localhost:4000/api/repartos/${id}`
        );
        const repartosActualizados = repartos.filter(
          (repartoState) => repartoState._id !== id
        );
        setRepartos(repartosActualizados);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <RepartosContext.Provider
      value={{
        repartos,
        guardarReparto,
        setEditando,
        reparto,
        eliminarReparto,
      }}
    >
      {children}
    </RepartosContext.Provider>
  );
};

export default RepartosContext;
