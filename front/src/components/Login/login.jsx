import { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("user"));

  const authentication = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("user_name", username);
    data.append("password", password);
    fetch("http://localhost/routes/registration.php", {
      method: "POST",
      body: data,
    }).then(async (res) => {
      let user = await res.json()
      localStorage.setItem("user", JSON.stringify(user))
      const users = JSON.parse(localStorage.getItem("user")) || {}
      if (user.error) {
          alert(res.error)
          return
      }
      navigate('/home')
      return
  });
};
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <form className={styles.form} onSubmit={(e) => {authentication (e) }}>
        <p className={styles.heading}>Login</p>
        <div className={styles.inputContainer}>
          <input
            placeholder="Username"
            className={styles.inputField}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            placeholder="Password"
            className={styles.inputField}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button value="login"className={styles.button} type="submit">
          Entrar
        </button>
        <div>
          <p>Não tem uma conta?</p>
          <a
            href="/signup"
            className="container justify-content-center ms-3"
            style={{ textDecoration: "none" }}
          >
            Cadastre-se
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
