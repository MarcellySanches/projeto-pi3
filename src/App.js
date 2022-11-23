import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    // eslint-disable-next-line no-unreachable
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}
