// import { useState } from "react";
import styles from "./login.module.css";

function Login() {
  // const [input, setInput] = useState({
  //   username: "",
  //   password: "",
  // });

  // const verifyUser = (e) => {
  //   e.preventDefault();
  //   if (input.username !== "" && input.password !== "") {
  //   }
  //   alert("");
  // };

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <form className={styles.form} action="">
        <p className={styles.heading}>Login</p>
        <div className={styles.inputContainer}>
          <input
            placeholder="Username"
            id="username"
            className={styles.inputField}
            type="text"
          />
        </div>

        <div className={styles.inputContainer}>
          <input
            placeholder="Password"
            id="password"
            className={styles.inputField}
            type="password"
          />
        </div>

        <button className={styles.button}>Entrar</button>
        <div>
          <p>Não tem uma conta? </p>
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
