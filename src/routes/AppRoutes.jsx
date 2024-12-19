import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CadastroColaborador from '../pages/CadastroColaborador/index';
import DadosPaciente from '../pages/DadosPaciente';
import Recepcao from '../pages/Recepcao/index';
import Login from '../pages/Login';
import NovaSenha from '../pages/NovaSenha';
import FilaEnfermagem from '../pages/FilaEnfermagem';
import CadastroPaciente from '../pages/CadastroPaciente';
import FilaTriagem from '../pages/FilaTriagem'; 
import Consulta from '../pages/Consulta'; 
import TriagemMedico from '../pages/TriagemMedico'; 
import Triagem from '../pages/Triagem'; 
import EncaminhamentoMedico from '../pages/EncaminhamentoMedico';
import EncaminhamentoEnfermagem from '../pages/EncaminhamentoEnfermagem';
import FilaMedico from '../pages/FilaMedico';
import PrescricaoMedica from '../pages/PrescricaoMedica';
import Prontuario from '../pages/Prontuario';
import PrivateRoutes from './PrivateRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/fila/enfermagem' element={<PrivateRoutes><FilaEnfermagem /></PrivateRoutes>} />
      <Route path='/cadastro/paciente' element={<PrivateRoutes><CadastroPaciente /></PrivateRoutes>} />
      <Route path='/dados/paciente' element={<PrivateRoutes><DadosPaciente /></PrivateRoutes>} />
      <Route path='/novaSenha' element={<PrivateRoutes><NovaSenha /></PrivateRoutes>} />
      <Route path='/recepcao' element={<PrivateRoutes><Recepcao /></PrivateRoutes>} />
      <Route path='/cadastro/colaborador' element={<CadastroColaborador />} />
      <Route path='/fila/triagem' element={<PrivateRoutes><FilaTriagem /></PrivateRoutes>} /> 
      <Route path='/triagem/medico' element={<PrivateRoutes><TriagemMedico /></PrivateRoutes>} /> 
      <Route path='/triagem' element={<PrivateRoutes><Triagem /></PrivateRoutes>} /> 
      <Route path='/consulta' element={<PrivateRoutes><Consulta /></PrivateRoutes>} /> 
      <Route path='/encaminhamento/medico' element={<PrivateRoutes><EncaminhamentoMedico /></PrivateRoutes>} /> 
      <Route path='/encaminhamento/enfermagem' element={<PrivateRoutes><EncaminhamentoEnfermagem /></PrivateRoutes>} /> 
      <Route path='/fila/medico' element={<PrivateRoutes><FilaMedico /></PrivateRoutes>} />
      <Route path='/prescricao/medica' element={<PrivateRoutes><PrescricaoMedica /></PrivateRoutes>} /> 
      <Route path='/prontuario' element={<PrivateRoutes><Prontuario /></PrivateRoutes>} />
    </Routes>
  );
}