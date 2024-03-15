import styles from "./signUp.module.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function SignUp() {
  const [users, setUsers] = useState([]);
  const [username, setUserName] = useState([]);
  const [password, setPassword] = useState([]);

  useEffect(() => {
    readUsers();
  }, []);

  const readUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost/routes/registration.php"
      );
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.log("Erro ao carregar usuários", error);
    }
  };

  const saveUsers = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("user_name", username);
    data.append("password", password);
    fetch("http://localhost/routes/registration.php", {
      method: "POST",
      body: data,
    });
    alert("Conta criado com sucesso!")
    window.location.reload();
    console.log(users); 
  }; 

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <form onSubmit={saveUsers} className={styles.form}>
        <p className={styles.title}>Cadastre-se</p>
        <p className={styles.message}>
          Crie uma conta para comprar em nossa loja!
        </p>
        <div className={styles.flex}></div>
        <label>
          <input
            required=""
            placeholder=""
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <span>Username</span>
        </label>

        <label>
          <input
            required=""
            placeholder=""
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </label>
        <button  className={styles.submit}>
          Enviar
        </button>
        <p className={styles.signin}>
          Já tem uma conta?{" "}
          <NavLink
            className="text m-3"
            style={{ textDecoration: "none" }}
            to="/"
          />
          Entre{" "}
        </p>
      </form>
    </div>
  );
}
export default SignUp;
