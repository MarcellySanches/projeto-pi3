/* eslint-disable no-unused-vars */
import { Switch } from "react-router-dom";
import Route from "./Route";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import UserAccountData from "../pages/UserAccountData";
import Courses from "../pages/Courses";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/registro" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/cursos" component={Courses} isPrivate />
      <Route exact path="/conta" component={UserAccountData} isPrivate />
    </Switch>
  );
}
