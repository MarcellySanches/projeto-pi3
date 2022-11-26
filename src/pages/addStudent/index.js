/* eslint-disable no-undef */
import { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import "./addStudent.css";
import Header from "../../components/Header";
import TitleArea from "../../components/TitleArea";
import { AuthContext } from "../../contexts/auth";
import { MdAddCircle } from "react-icons/md";

export default function AddStudent() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const history = useHistory();
  const [load, setLoad] = useState(true);
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [contato, setContato] = useState("");
  const [matricula, setMatricula] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [curso, setCurso] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [turmaSelect, setTurmaSelect] = useState(0);
  const [idStudent, setIdStudent] = useState(false);

  const paramsId = id.replace("}", "");

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("courses")
        .get()
        .then((data) => {
          let list = [];

          data.forEach((course) => {
            list.push({
              id: course.id,
              codigo: course.data().codigo,
              curso: course.data().curso,
            });
          });

          if (list === 0) {
            console.log("Não há lista");
            setTurmas(["não há turmas cadastradas"]);
            setLoad(false);
            return;
          }

          setTurmas(list);
          setLoad(false);

          if (paramsId) {
            console.log("passei aqui ");
            setIdStudent(true);
            console.log("passei aqui id ", idStudent);
            getDataId(data);
          }
        })
        .catch((error) => {
          alert("Erro ao buscar informações");
          setLoad(false);
          setTurmas([{ id: "1", codigo: "" }]);
        });
    }

    load();
  }, [paramsId]);

  async function getDataId(data) {
    await firebase
      .firestore()
      .collection("students")
      .doc(paramsId)
      .get()
      .then((snapshot) => {
        console.log(snapshot.data().nome);
        console.log(paramsId);
        setNome(snapshot.data().nome);
        setCidade(snapshot.data().cidade);
        setContato(snapshot.data().contato);
        setCurso(snapshot.data().curso);
        setNascimento(snapshot.data().nascimento);
        setEndereco(snapshot.data().endereco);
        setEstado(snapshot.data().estado);
        setMatricula(snapshot.data().matricula);
        setStatus(snapshot.data().status);

        let index = data.findIndex(
          (item) => item.id === snapshot.data().turmaSelecionada
        );

        setTurmaSelect(index);
        setIdStudent(true);
        console.log(idStudent);
      })
      .catch((error) => {
        setIdStudent(false);
      });
  }

  async function saveStudent(e) {
    e.preventDefault();

    if (paramsId) {
      await firebase
        .firestore()
        .collection("students")
        .doc(paramsId)
        .update({
          nome: nome,
          nascimento: nascimento,
          endereco: endereco,
          cidade: cidade,
          estado: estado,
          contato: contato,
          matricula: matricula,
          curso: turmas[turmaSelect].curso,
          turmaSelecionada: turmas[turmaSelect].codigo,
          status: status,
          uidCadastradoPor: user.uid,
        })
        .then(() => {
          toast.success("Editado com sucesso.");
          setTurmaSelect(0);
          history.push("/alunos");
        })
        .catch((err) => {
          toast.error("Erro ao editar dados");
        });

      return;
    }

    await firebase
      .firestore()
      .collection("students")
      .add({
        nome: nome,
        nascimento: nascimento,
        endereco: endereco,
        cidade: cidade,
        estado: estado,
        contato: contato,
        matricula: matricula,
        curso: turmas[turmaSelect].curso,
        turmaSelecionada: turmas[turmaSelect].codigo,
        status: status,
        uidCadastradoPor: user.uid,
      })
      .then(() => {
        toast.success("Aluno adicionado com sucesso");
        setNome("");
        setNascimento("");
        setEndereco("");
        setCidade("");
        setEstado("");
        setContato("");
        setCurso("");
        setMatricula("");
        setStatus("Ativo");
        setTurmaSelect(0);
        console.log("ok");
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  function radioChange(e) {
    setStatus(e.target.value);
  }

  function turmaChange(e) {
    setTurmaSelect(e.target.value);
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
            <input
              type="text"
              placeholder="nome do aluno"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label>Data de nascimento</label>
            <input
              type="date"
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
            />

            <label>Endereço</label>
            <input
              type="text"
              placeholder="Rua, avenida,..."
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />

            <label>Cidade</label>
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />

            <label>Estado</label>
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />

            <label>Contato</label>
            <input
              type="text"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
            />

            <label>Turma</label>
            <select value={turmaSelect} onChange={turmaChange}>
              {turmas.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.codigo + ` (${item.curso})`}
                  </option>
                );
              })}
            </select>

            <label>Matricula</label>
            <input
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />

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
