import { createContext, useState, useEffect } from "react";
import firebase from "../services/firebaseConnection";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem("RegisterUser");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signIn(email, password) {
    setLoadingAuth(true);

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const userRegister = await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get();

        let data = {
          uid: uid,
          nome: userRegister.data().nome,
          photoUrl: userRegister.data().photorUrl,
          email: value.user.email,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("Seja bem vindo");
      })
      .catch((error) => {
        alert("error: " + error.message);
        toast.error("Algo errado, tente novamente");
        setLoadingAuth(false);
      });
  }

  async function signUp(email, password, nome) {
    setLoadingAuth(true);

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .set({
            nome: nome,
            photoUrl: null,
          })
          .then(() => {
            let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
              photoUrl: null,
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Olá, você está logado");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Algo errado, tente novamente");
        setLoadingAuth(false);
      });
  }

  function storageUser(data) {
    localStorage.setItem("RegisterUser", JSON.stringify(data));
  }

  async function logOut() {
    await firebase.auth().signOut();
    localStorage.removeItem("RegisterUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        loadingAuth,
        signUp,
        logOut,
        signIn,
        setUser,
        storageUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
