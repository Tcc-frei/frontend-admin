import { useNavigate } from "react-router-dom";
import "./styles.scss";

import logoRaio from "../../assets/logo-thunder.svg";
import imgCadeado from "../../assets/logo-key.svg";

import { LuKeyRound } from "react-icons/lu";

import { entrar } from "../../service/auth.js";
import { useState } from "react";

export function Painel() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    try {
      entrar(email, senha);

      navigate("/");
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <main className="conteudo-principal">
      <div className="conteudo-esquerdo">
        <div className="cabecalho-esquerdo">
          <img src={logoRaio} alt="Logo de um raio" width={60} />
        </div>

        <img src={imgCadeado} alt="Logo de um cadeado" width={200} />

        <span className="mensagem">
          Bem-vindo ao portal administrativo da Elethronos.
        </span>
      </div>
      <div className="conteudo-direito">
        <div className="titulo">
          <LuKeyRound />
          <h3>Painel de administrador</h3>
        </div>

        <form className="formulario">
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
          />

          <p className="msg-erro">{erro}</p>

          <button onClick={onSubmit} className="botao-entrar" type="submit">
            Entrar
          </button>
        </form>

        <p className="direitos">
          &copy; Todos os direitos são reservados para Info Solutions.
        </p>
      </div>
    </main>
  );
}
