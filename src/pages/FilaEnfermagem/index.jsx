import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFila } from "../../context/FilaContext";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import Header from "../../components/Header";
import MenuAccessibility from "../../components/MenuAccessibility";
import {
  Card,
  Container,
  Forms,
  SectionForms,
  Table,
  TableRow,
  TableCell,
  PaginationRow,
  TableHeader,
  Nome,
  TableCellPrioridade,
} from "./styles";
import { useAuth } from "../../context/UseContext";
import { toast } from "react-toastify";
import { GetfilaExame, GetfilaMedico, PutFila } from "../../service/Fila";
import Toastify from "../../components/Toastify";
import { InserirConsulta } from "../../service/consulta";
import { GetEncaminhamento } from "../../service/encaminhamento";

export default function FilaEnfermagem() {
  const { nomeColaborador, registroColaborador, setRegistroColaborador, setNomeColaborador, idColaborador } = useAuth();
  const { setItemFila, itemFila, setConsulta } = useFila();
  const [fila, setFila] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getPacientes = async () => {
      try {
        const data = await GetfilaExame(page);
  
        const prioridadeMap = {
          EMERGÊNCIA: 1,
          MUITO_URGENTE: 2,
          URGENTE: 3,
          POUCO_URGENTE: 4,
          NÃO_URGENTE: 5,
        };
  
        const aguardandoData = data.filter(
          (paciente) =>
            paciente.status === "aguardando" || paciente.status === "Aguardando"
        );
  
        const aguardandoSorted = aguardandoData.sort((a, b) => {
          const prioridadeDiff = prioridadeMap[a.prioridade] - prioridadeMap[b.prioridade];
          if (prioridadeDiff !== 0) {
            return prioridadeDiff;
          }
  
          const horarioA = new Date(`1970-01-01T${a.horario}`);
          const horarioB = new Date(`1970-01-01T${b.horario}`);
          return horarioA - horarioB;
        });
  
        const atendimentoData = data.filter(
          (paciente) => paciente.status === "Atendimento"
        );
  
        const sortedData = [...aguardandoSorted, ...atendimentoData];
  
        setFila(sortedData);
      } catch (error) {
        toast.error("Erro ao buscar fila");
      }
    };
  
    getPacientes();
  }, [page]);
  

  const handlePacienteClick = async (paciente, event) => {
    event.preventDefault();

    if (paciente.status === "Atendimento") {
      toast.warn("Paciente em atendimento");
    }

    if (
      paciente.status === "aguardando" ||
      paciente.status === "Aguardando"
    ) {
      const fila = {
        id_paciente: paciente.paciente.id,
        prioridade: paciente.prioridade,
        setor: paciente.setor,
        status: "Atendimento",
        especialidade: paciente.especialidade,
        horario: paciente.horario,
      };
     
      const result = await PutFila(fila, paciente.id);

      if (result.sucess) {
        setItemFila(paciente);
        navigate("/encaminhamento/enfermagem");
      } else {
            if (result.data && result.data.erros && result.data.erros.length > 0) {
              toast.error(result.data.erros[0]);
            } else {
              toast.error("Erro ao encaminhar para o exame.");
            }
          }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nomeColaborador");
    localStorage.removeItem("registroColaborador");
    setNomeColaborador("");
    setRegistroColaborador("");
    navigate("/");
  };

  return (
    <>
      <MenuAccessibility />
      <Container>
        <Card>
          <Header
            name={nomeColaborador}
            matricula={registroColaborador}
            titleButton="Logout"
            handleFunction={handleLogout}
          />
          <Banner title="Fila de exame" />
          <SectionForms>
            <Forms>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader tabIndex={0}>Nome</TableHeader>
                    <TableHeader tabIndex={0}>Horário</TableHeader>
                    <TableHeader tabIndex={0}>Prioridade</TableHeader>
                    <TableHeader tabIndex={0}>Status</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {fila.map((item, index) => (
                    <TableRow key={index} tabIndex={0}>
                      <TableCell className="bold">
                        <Nome
                          href="#"
                          onClick={(event) => handlePacienteClick(item, event)}
                        >
                          {item.paciente?.nomeCompleto || "Nome não disponível"}
                        </Nome>
                      </TableCell>
                      <TableCell tabIndex={0}>
                        {item.horario ? item.horario : "Horário não disponível"}
                      </TableCell>
                      <TableCellPrioridade
                        prioridade={item.prioridade}
                        tabIndex={0}
                      >
                        {item.prioridade}
                      </TableCellPrioridade>
                      <TableCell tabIndex={0}>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
              <PaginationRow>
                <Button
                  title="Anterior"
                  type="button"
                  handleFunction={() => {
                    if (page > 0) setPage((prevPage) => prevPage - 1);
                  }}
                  disabled={page === 0}
                />
                <span>{page + 1}</span>
                <Button
                  title="Próximo"
                  type="button"
                  handleFunction={() => setPage((prevPage) => prevPage + 1)}
                />
              </PaginationRow>
            </Forms>
          </SectionForms>
        </Card>
        <Toastify />
      </Container>
    </>
  );
}
