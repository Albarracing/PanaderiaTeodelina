import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./paginas/home.jsx";
import Clientes from "./paginas/Clientes.jsx";
import Articulos from "./paginas/Articulos.jsx";
import Repartos from "./paginas/Repartos.jsx";

import { ClientesProvider } from "./contex/ClientesProvider.jsx";
import { ArticulosProvider } from "./contex/AticulosProvider.jsx";
import { RepartosProvider } from "./contex/RepartosProvider.jsx";
function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
          
        </Routes> */}

      <ClientesProvider>
        <ArticulosProvider>
          <RepartosProvider>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="Clientes" element={<Clientes />} />
              <Route path="Articulos" element={<Articulos />} />
              <Route path="Repartos" element={<Repartos />} />
            </Routes>
          </RepartosProvider>
        </ArticulosProvider>
      </ClientesProvider>
    </BrowserRouter>
  );
}

export default App;
