import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";

export default function Dashboard() {
  const { logOut } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <button onClick={() => logOut()}>Sair</button>
    </div>
  );
}
