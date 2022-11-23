import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import "./header.css";
import nonePhoto from "../../assets/nonePhoto.png";
import {
  MdLogout,
  MdPeople,
  MdManageAccounts,
  MdOutlineBookmark,
} from "react-icons/md";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img
          src={user.photoUrl === null ? nonePhoto : user.photoUrl}
          alt="Foto de perfil"
        />
      </div>
      <Link to="/dashboard">
        <MdPeople color="#000" size={26} />
        Alunos
      </Link>
      <Link to="/cursos">
        <MdOutlineBookmark color="#000" size={26} />
        Cursos
      </Link>
      <Link to="/conta">
        <MdManageAccounts color="#000" size={26} />
        Conta do Usuário
      </Link>

      <Link onClick={() => logOut()}>
        <MdLogout color="#000" size={26} />
        Sair
      </Link>
      



      


    </div>
  );
}
