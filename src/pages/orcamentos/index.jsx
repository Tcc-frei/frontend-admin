import { useEffect, useState } from "react";
import { CardVisita } from "../../components/card-visita";
import { Sidebar } from "../../components/sidebar";

import "./styles.scss";
import { api } from "../../service/axios";
import { ModalOrcamentoDetalhes } from "../../components/modal-orcamento-detalhe";

export function OrcamentoPage() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [showDetalhesOrcamento, setShowDetalhesOrcamento] = useState(false);

  const [ídOrcamento, setIdOrcamento] = useState(0);

  function abrirDetalhesOrcamento(id) {
    setIdOrcamento(id);

    setShowDetalhesOrcamento(true);
  }

  const fecharModalDetalhes = () => setShowDetalhesOrcamento(false);

  useEffect(() => {
    async function pegarOrcamentos() {
      try {
        const resposta = await api.get("/orcamentos");

        // console.log(resposta.data);

        setOrcamentos(resposta.data.reverse());
      } catch (error) {
        console.log(error);
      }
    }

    pegarOrcamentos();
  }, []);

  return (
    <div className="pagina">
      <Sidebar />

      <div className="main-content">
        <div className="cabecalho">
          <h2 className="titulo-cabecalho">Orçamentos</h2>
        </div>

        {showDetalhesOrcamento && (
          <div className="container-modal">
            <ModalOrcamentoDetalhes
              id={ídOrcamento}
              fecharModal={fecharModalDetalhes}
            />
          </div>
        )}

        <section className="container-visitas">
          <div className="visitas">
            <h3 className="txt-confirmada">Aprovados</h3>

            <div className="container-cards">
              {orcamentos
                .filter((o) => o.status === "aprovado")
                .map((o) => {
                  return (
                    <CardVisita
                      key={o.id}
                      cliente={o.cliente}
                      descricao={o.descricao}
                      status={o.status}
                    />
                  );
                })}
            </div>
          </div>

          <div className="visitas">
            <h3 className="txt-pendente">Aguardando aprovação</h3>

            <div className="container-cards">
              {orcamentos
                .reverse()
                .filter((o) => o.status === "pendente")
                .map((o) => {
                  return (
                    <CardVisita
                      key={o.id}
                      cliente={o.cliente}
                      descricao={o.descricao}
                      status={o.status}
                      abrirDetalhes={() => abrirDetalhesOrcamento(o.id)}
                    />
                  );
                })}
            </div>
          </div>

          <div className="visitas">
            <h3 className="txt-finalizado">Finalizados</h3>

            <div className="container-cards">
              {orcamentos
                .filter((o) => o.status === "finalizado")
                .map((o) => {
                  return (
                    <CardVisita
                      key={o.id}
                      cliente={o.cliente}
                      descricao={o.descricao}
                      status={o.status}
                    />
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
