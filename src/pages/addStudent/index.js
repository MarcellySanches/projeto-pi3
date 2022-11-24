import { useState } from "react";
import "./addStudent.css";
import Header from "../../components/Header";
import TitleArea from "../../components/TitleArea";
import { MdAddCircle } from "react-icons/md";

export default function AddStudent() {
  const [nome, setnome] = useState("");
  const [nascimento, setnascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [contato, setTurma] = useState("");
  const [matricula, setMatricula] = useState("");
  const [status, setStatus] = useState("Ativo");

  function saveStudent(e) {
    e.preventDefault();
  }

  function radioChange(e) {
    setStatus(e.target.value);
  }

  return (
    <div>
      <Header />
      <div className="content">
        <TitleArea name="Adicionar aluno">
          <MdAddCircle size={30} />
        </TitleArea>
        <div className="container">
          <form className="accountForm" onSubmit={saveStudent}>
            <label>Nome</label>
            <input type="text"></input>

            <label>Data de nascimento</label>
            <input type="date"></input>

            <label>Endereço</label>
            <input type="text"></input>

            <label>Cidade</label>
            <input type="text"></input>

            <label>Estado</label>
            <input type="text"></input>

            <label>Contato</label>
            <input type="text"></input>

            <label>Turma</label>
            <select>
              <option key={1} value={1}>
                teste
              </option>
            </select>

            <label>Matricula</label>
            <input type="text"></input>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Ativo"
                onChange={radioChange}
                checked={status === "Ativo"}
              />
              <span>Ativo</span>
              <input
                type="radio"
                name="radio"
                value="Inativo"
                onChange={radioChange}
                checked={status === "Inativo"}
              />
              <span>Inativo</span>
            </div>
            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
