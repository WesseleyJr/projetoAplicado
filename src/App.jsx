import { BrowserRouter } from "react-router-dom";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { PacienteProvider } from "./context/PacienteContext";
import { FilaProvider } from "./context/FilaContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./routes/AppRoutes";
import CadastroPaciente from "./pages/CadastroPaciente";
import DadosPaciente from "./pages/DadosPaciente";
import { UseProvider } from "./context/UseContext";

function App() {
  return (
    <AccessibilityProvider>
        <UseProvider>
        <PacienteProvider>
          <FilaProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </FilaProvider>
        </PacienteProvider>
    </UseProvider>
      </AccessibilityProvider>
  );
}

export default App;
