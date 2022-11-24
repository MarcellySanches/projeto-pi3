import { useState } from "react";
import "./students.css";
import { AuthContext } from "../../contexts/auth";
import { MdPeople, MdOutlineAddCircle, MdSearch, MdModeEditOutline } from "react-icons/md";
import Header from "../../components/Header";
import TitleArea from "../../components/TitleArea";
import { Link } from "react-router-dom";

export default function Students() {
  const [allStudents, setAllStudents] = useState([1]);
  return (
    <div>
      <Header />
      <div className="content">
        <TitleArea name="Alunos">
          <MdPeople size={30} />
        </TitleArea>

        {allStudents.length === 0 ? (
          <div className="container students">
            <span>Nenhum aluno cadastrado</span>

            <Link to="/adicionarAluno" className="addStudent">
              Add aluno
              <MdOutlineAddCircle size={25} />
            </Link>
          </div>
        ) : (
          <>
            <Link to="/adicionarAluno" className="addStudent">
              Add aluno
              <MdOutlineAddCircle size={25} />
            </Link>

            <table className="">
              <thead class="">
                <tr>
                  <th scope="col">Matrícula</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Turma</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <td data-label="Matricula">Matricula</td>
                <td data-label="Nome">Nome</td>
                <td data-label="Turma">Turma</td>
                <td data-label="Status">
                  <span className="badge">Ativo</span>
                </td>
                <td data-label="Botoes">
                  <button classnName="btn-table" style={{backgroundColor: '#578c90', color:'#e5e5e5e5'}}>
                    <MdSearch size={20}/>
                  </button>
                  <button classnName="btn-table" style={{backgroundColor: '#339966', color:'#e5e5e5e5'}}>
                    <MdModeEditOutline size={20}/>
                  </button>
                </td>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
