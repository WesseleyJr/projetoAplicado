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
  TableWrapper,
  Table,
  TableRow,
  TableCell,
  PaginationRow,
  TableHeader,
  Nome,
} from "./styles";
import { useAuth } from "../../context/UseContext";
import Toastify from "../../components/Toastify";
import { toast } from "react-toastify";
import { GetfilaTriagem, PutFila } from "../../service/Fila";

export default function FilaTriagem() {
  const { nomeColaborador, registroColaborador, setRegistroColaborador, setNomeColaborador } = useAuth();
  const { setItemFila } = useFila();
  const [fila, setFila] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getPacientes = async () => {
      try {
        const data = await GetfilaTriagem(page);
  
        const aguardandoData = data.filter(
          (paciente) =>
            paciente.status === "aguardando" || paciente.status === "Aguardando"
        );
  
        const aguardandoSorted = aguardandoData.sort((a, b) => {
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

    if (paciente.status === "Aguardando" || paciente.status === "aguardando") {
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
        toast.success("Paciente encaminhado para consulta");
        navigate("/triagem");
      } else {
            if (result.data && result.data.erros && result.data.erros.length > 0) {
              toast.error(result.data.erros[0]);
            } else {
              toast.error("Erro ao encaminhar para triagem.");
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
          <Banner title="Fila de Triagem" />
          <SectionForms>
            <Forms>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader tabIndex={0}>Nome</TableHeader>
                    <TableHeader tabIndex={0}>Horário</TableHeader>
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
