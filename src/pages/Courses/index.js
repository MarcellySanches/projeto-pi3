import { useState } from "react";
import { toast } from "react-toastify";
import firebase from "../../services/firebaseConnection";
import "./courses.css";
import TitleArea from "../../components/TitleArea";
import Header from "../../components/Header";
import { MdBookmark } from "react-icons/md";

export default function Courses() {
  const [codeGroup, setCodeGroup] = useState("");
  const [course, setCourse] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function addCourse(e) {
    e.preventDefault();

    if (
      course !== "" &&
      codeGroup !== "" &&
      startDate !== "" &&
      endDate !== ""
    ) {
      await firebase
        .firestore()
        .collection("courses")
        .add({
          codigo: codeGroup,
          curso: course,
          dataInicial: startDate,
          dataFinal: endDate,
        })
        .then(() => {
          setCodeGroup("");
          setCourse("");
          setStartDate("");
          setEndDate("");
          toast.success("Curso cadastrado com sucesso");
        })
        .catch((error) => {
          toast.error(
            "Ops, algo deu errado ao cadastrar o curso, tente novamente"
          );
        });
    } else {
      toast.warning("preencha todos os campos");
    }
  }
  return (
    <div>
      <Header />

      <div className="content">
        <TitleArea name="Cursos">
          <MdBookmark size={30} />
        </TitleArea>

        <div class="container">
          <form className="accountForm" onSubmit={addCourse}>
            <label>Código da turma</label>
            <input
              type="text"
              value={codeGroup}
              onChange={(e) => setCodeGroup(e.target.value)}
              placeholder="Digite o código da turma"
            />

            <label>Curso</label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Digite o nome curso"
            />

            <label>Data de inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Digite a data de inicio do curso"
            />

            <label>Data final</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Digite a data final do curso"
            />

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
