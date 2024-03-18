import styles from "./signUp.module.css";
// import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [users, setUsers] = useState([]);
  const [username, setUserName] = useState([]);
  const [password, setPassword] = useState([]);
  const navigate = useNavigate();

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
    navigate("/home")
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
            placeholder="username"
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>

        <label>
          <input
            required=""
            placeholder="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button  to="/home "className={styles.submit}>
        <a
            className="text m-3"
            style={{ textDecoration: "none" }}
            href="/home"
          >
            </a>
        
          Enviar
        </button>
        <p className={styles.signin}>
          Já tem uma conta?{" "}
          <a
            className="text m-3"
            style={{ textDecoration: "none" }}
            href="/"
          >
            Entre
            </a>
        </p>
      </form>
    </div>
  );
}
export default SignUp;
