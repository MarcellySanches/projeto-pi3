import "./modal.css";
import { MdCancel } from "react-icons/md";

export default function Modal({ content, close }) {
  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={ close }>
          <MdCancel className="cancel" size={30} />
        </button>

        <div>
            <div className="titleModal"><h2>Dados do aluno</h2></div>
          
          <div className="row">
            <span>
              Nome: <a>{content.nome}</a>
            </span>
          </div>
          <div className="row">
            <span>
              Nascimento: <a>{content.nascimento}</a>
            </span>
          </div>
          <div className="row">
            <span>
              Endereco: <a>{content.endereco}</a>
            </span>
          </div>
          <div className="row">
            <span>
              Cidade: <a>{content.cidade}</a>
            </span>
            <span>
              Estado: <a>{content.estado}</a>
            </span>
          </div>
          <div className="row">
            <span>
              curso: <a>{content.curso}</a>
            </span>
            <span>
              turma: <a>{content.turmaSelecionada}</a>
            </span>
          </div>
          <div className="row">
            <span>
              matricula: <a>{content.matricula}</a>
            </span>
          </div>
          <div className="row">
            <span>
              status:
              <a
                style={{
                  background:
                    content.status === "Ativo" ? "#32cd32" : "#Da2A2A",
                }}
              >
                {content.status}
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
