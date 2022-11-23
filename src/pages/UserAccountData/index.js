import { useState, useContext } from "react";
import "./userAccountData.css";
import Header from "../../components/Header";
import TitleArea from "../../components/TitleArea";
import { MdManageAccounts, MdDriveFolderUpload } from "react-icons/md";
import { AuthContext } from "../../contexts/auth";
import nonePhoto from "../../assets/nonePhoto.png";
import firebase from "../../services/firebaseConnection";
import { upload } from "@testing-library/user-event/dist/upload";

export default function UserAccountData() {
  const { user, setUser, storageUser } = useContext(AuthContext);
  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [photoUrl, setPhotoUrl] = useState(user && user.photoUrl);
  const [photo, setPhoto] = useState(null);

  async function uploadData() {
    const userUid = user.uid;

    const upload = await firebase
      .storage()
      .ref(`images/${userUid}/${photo.name}`)
      .put(photo)
      .then(async () => {
        alert("Foto atualizada com sucesso");

        await firebase
          .storage()
          .ref(`images/${userUid}`)
          .child(photo.name)
          .getDownloadURL()
          .then(async (url) => {
            let urlPhoto = url;
            console.log(urlPhoto);

            await firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({
                photoUrl: urlPhoto,
                nome: nome,
              })
              .then(() => {
                let data = {
                  ...user,
                  photoUrl: urlPhoto,
                  nome: nome,
                };

                setUser(data);
                storageUser(data);
              });
          });
      });
  }

  async function previous(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setPhoto(image);
        setPhotoUrl(URL.createObjectURL(e.target.files[0]));
      } else {
        alert("Tente novamente");
        setPhoto(null);

        return null;
      }
    }
  }

  async function saveData(e) {
    e.preventDefault();
    if (photo === null && nome !== "") {
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({ nome: nome })
        .then(() => {
          let data = {
            ...user,
            nome: nome,
          };
          setUser(data);
          storageUser(data);
        });
    } else if (nome !== "" && photo !== null) {
      uploadData();
    }
  }

  return (
    <div>
      <Header />

      <div className="content">
        <TitleArea name="Minha conta">
          <MdManageAccounts size={25} />
        </TitleArea>

        <div className="container">
          <form className="accountForm" onSubmit={saveData}>
            <label className="accountPhoto">
              <span>
                <MdDriveFolderUpload size={45} />
              </span>

              <input type="file" accept="image/*" onChange={previous} />
              <br />

              {photoUrl === null ? (
                <img
                  src={nonePhoto}
                  width="250"
                  height="250"
                  alt="Sem foto de perfil"
                />
              ) : (
                <img
                  src={photoUrl}
                  width="250"
                  height="250"
                  alt="Foto de perfil"
                />
              )}
            </label>

            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label>E-mail</label>
            <input type="email" value={email} disabled />

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
