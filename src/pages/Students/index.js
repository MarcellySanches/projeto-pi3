import { useState, useEffect } from "react";
import firebase from "../../services/firebaseConnection";
import "./students.css";
import { AuthContext } from "../../contexts/auth";
import {
  MdPeople,
  MdOutlineAddCircle,
  MdSearch,
  MdModeEditOutline,
} from "react-icons/md";
import Header from "../../components/Header";
import TitleArea from "../../components/TitleArea";
import { Link } from "react-router-dom";

export default function Students() {
  const [dashStudents, setDashStudents] = useState([]);
  const [load, setLoad] = useState(true);
  const [moreStudents, setMoreStudents] = useState(false);
  const [noData, setNoData] = useState(false);
  const [lastData, setLastData] = useState();

  useEffect(() => {
    getStudents();
    return () => {};
  }, []);

  async function getStudents() {
    await firebase
      .firestore()
      .collection("students")
      .orderBy("nome", "asc")
      .limit(10)
      .get()
      .then((data) => {
        verifyData(data);
      })
      .catch((error) => {
        setMoreStudents(false);
      });

    setLoad(false);
  }

  async function verifyData(data) {
    const noStudentsData = data.size === 0;

    if (!noData) {
      let list = [];

      data.forEach((value) => {
        list.push({
          curso: value.data().curso,
          cidade: value.data().cidade,
          contato: value.data().contato,
          endereco: value.data().endereco,
          estado: value.data().estado,
          matricula: value.data().matricula,
          nascimento: value.data().nascimento,
          nome: value.data().nome,
          status: value.data().status,
          turmaSelecionada: value.data().turmaSelecionada,
          id: value.id,
        });
      });

      const lastData = data.docs[data.docs.length - 1];

      setDashStudents((students) => [...students, ...list]);
      setLastData(lastData);
    } else {
      setNoData(true);
    }

    setMoreStudents(false);
  }

  return (
    <div>
      <Header />
      <div className="content">
        <TitleArea name="Alunos">
          <MdPeople size={30} />
        </TitleArea>

        {dashStudents.length === 0 ? (
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
                {dashStudents.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Matricula">{item.matricula}</td>
                      <td data-label="Nome">{item.nome}</td>
                      <td data-label="Turma">{item.turmaSelecionada}</td>
                      <td data-label="Status">
                        <span
                          className="badge"
                          style={{
                            background:
                              item.status === "Ativo" ? "#32cd32" : "#Da2A2A",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="Botoes">
                        <button
                          classnName="btn-table"
                          style={{
                            backgroundColor: "#578c90",
                            color: "#e5e5e5e5",
                          }}
                        >
                          <MdSearch size={20} />
                        </button>
                        <button
                          classnName="btn-table"
                          style={{
                            backgroundColor: "#339966",
                            color: "#e5e5e5e5",
                          }}
                        >
                          <MdModeEditOutline size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
