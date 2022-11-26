/* eslint-disable no-unused-vars */
import { Switch } from "react-router-dom";
import Route from "./Route";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UserAccountData from "../pages/UserAccountData";
import Courses from "../pages/Courses";
import Students from "../pages/Students";
import AddStudent from "../pages/addStudent";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/registro" component={SignUp} />
      <Route exact path="/alunos" component={Students} isPrivate />
      <Route exact path="/cursos" component={Courses} isPrivate />
      <Route exact path="/conta" component={UserAccountData} isPrivate />
      <Route exact path="/adicionarAluno" component={AddStudent} isPrivate />
      <Route
        exact
        path="/adicionarAluno/:id"
        component={AddStudent}
        isPrivate
      />
    </Switch>
  );
}
