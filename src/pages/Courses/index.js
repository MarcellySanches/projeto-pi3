import { useState } from "react";
import "./courses.css";
import TitleArea from "../../components/TitleArea";
import Header from "../../components/Header";
import { MdBookmark } from "react-icons/md";

export default function Courses() {
  const [turma, setTurma] = useState("");
  const [curso, setCurso] = useState("");

  function addCourse(e) {
    e.preventDefault();

    alert("Course");
  }
  return (
    <div>
      <Header />

      <div className="content">
        <TitleArea name="Cursos">
          <MdBookmark size={25} />
        </TitleArea>

        <div class="container">
          <form className="accountForm" onSubmit={addCourse}>
            <label>Turma</label>
            <input
              type="text"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              placeholder="Digite o código da turma"
            />

            <label>Curso</label>
            <input
              type="text"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              placeholder="Digite o nome curso"
            />

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
