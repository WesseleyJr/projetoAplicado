import React, { useEffect, useState } from "react";
import { useFila } from "../../context/FilaContext";
import { useAuth } from "../../context/UseContext";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import MenuAccessibility from "../../components/MenuAccessibility";
import {
  Container,
  Card,
  Section,
  TitleCard,
  Title,
  Content,
  Dropdown,
  DropdownButton,
  TitleH3,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { GetProntuario } from "../../service/consulta";
import VisualizarPdf from "../../components/VisualizarPdf";

export default function Prontuario() {
  const { itemFila } = useFila();
  const { nomeColaborador, registroColaborador } = useAuth();
  const [isOpen, setIsOpen] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  const handleClick = (idExame) => {
    const url = `http://35.223.203.22:8016/api/exame/${idExame}/exame`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const reader = async () => {
      const result = await GetProntuario(itemFila.paciente.id);
      if (result.sucess) {
        const ordemNull = result.data.filter(
          (item) => item.diagnostico != "null"
        );
        const ordemUnique = ordemNull.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.diagnostico === value.diagnostico)
        );

        setConsultas(ordemUnique);
      } else {
                if (result.data && result.data.erros && result.data.erros.length > 0) {
                  toast.error(result.data.erros[0]);
                } else {
                  toast.error("Erro desconhecido, tente novamente.");
                }
              }
    };
    reader();
  }, []);

  return (
    <>
      <MenuAccessibility />
      <Container>
        <Card>
          <Header
            name={nomeColaborador}
            matricula={registroColaborador}
            titleButton="Voltar"
            handleFunction={() => {
              navigate("/consulta");
            }}
          />
          <Banner title="Prontuário Médico" />
          <Section>
            {consultas.map((item, index) => (
              <div key={index}>
                <TitleCard>
                  <Title onClick={() => toggleDropdown(index)}>
                    <span>{item.especialidade}</span>
                    <span>
                      {item.dataConsulta
                        ? item.dataConsulta.split("-").reverse().join("/")
                        : "Data não disponível"}
                    </span>
                    <DropdownButton onClick={() => toggleDropdown(index)}>
                      {isOpen === index ? "Ocultar" : "Exibir"}
                    </DropdownButton>
                  </Title>
                </TitleCard>

                {isOpen === index && (
                  <Dropdown>
                    <TitleH3>
                      {item.nomeMedico} - {item.registroMedico}
                    </TitleH3>
                    {item.diagnostico && (
                      <Content>
                        <TitleH3>Diagnóstico:</TitleH3>
                        <p>
                          {item.diagnostico || "Diagnóstico não disponível"}
                        </p>
                      </Content>
                    )}
                    {(item.tipoExame || item.instrucoes) && (
                      <Content>
                        <hr />
                        <TitleH3>Encaminhamentos:</TitleH3>
                        {item.tipoExame && (
                          <p>
                            <strong>Tipo:</strong> {item.tipoExame}
                          </p>
                        )}
                        {item.instrucoes && (
                          <p>
                            <strong>Instruções:</strong> {item.instrucoes}
                          </p>
                        )}
                        <DropdownButton
                          onClick={() => {
                            handleClick(item.idExame);
                          }}
                          type="button"
                        >
                          Visualizar Resultado
                        </DropdownButton>
                      </Content>
                    )}

                    {(item.medicamento ||
                      item.dosagem ||
                      item.frequencia ||
                      item.duracao) && (
                      <Content>
                        <hr />
                        <TitleH3>Medicamentos:</TitleH3>
                        {item.medicamento && (
                          <p>
                            <strong>Medicamento:</strong> {item.medicamento}
                          </p>
                        )}
                        {item.dosagem && (
                          <p>
                            <strong>Dosagem:</strong> {item.dosagem}
                          </p>
                        )}
                        {item.frequencia && (
                          <p>
                            <strong>Frequência:</strong> {item.frequencia}
                          </p>
                        )}
                        {item.duracao && (
                          <p>
                            <strong>Duração:</strong> {item.duracao}
                          </p>
                        )}
                      </Content>
                    )}
                  </Dropdown>
                )}
              </div>
            ))}
          </Section>
        </Card>
      </Container>
    </>
  );
}
