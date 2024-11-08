import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdOutlinePassword, MdPerson } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import logoImage from "../images/logo (1).png";
import styles from "./LoginPage.module.css";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await api.post("/login", {
        username: username,
        password: password,
      });

      const authToken = response.headers.getAuthorization();
      const decoded = jwtDecode(authToken.slice(7));
      console.log(decoded);

      if (rememberMeChecked) {
        localStorage.setItem("authToken", authToken);
      } else {
        localStorage.setItem("authToken", authToken);
      }

      const userResponse = await api.get(`/user/${decoded.jti}`);
      console.log(userResponse.data);

      localStorage.setItem("isAuthenticated", "true");

      if (userResponse.data.profile.includes("ADM")) {
        navigate("/menuassistente", { replace: true });
      } else if (userResponse.data.profile.includes("SECRETARIA")) {
        navigate("/menusecretaria", { replace: true });
      }
    } catch (err) {
      console.log(err);
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <aside className={styles.sidebar}>
          <img src={logoImage} alt="Department Logo" className={styles.logo} />
          <h2 className={styles.departmentName}>
            Secretaria de Assistência Social
          </h2>
        </aside>
        <section className={styles.mainContent}>
          <h1 className={styles.formTitle}>Insira seus dados</h1>
          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <MdPerson className={styles.inputIcon} />
              <label htmlFor="login" className={styles.visuallyHidden}></label>
              <input
                id="login"
                type="text"
                className={styles.input}
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <MdOutlinePassword className={styles.inputIcon} />
              <label
                htmlFor="password"
                className={styles.visuallyHidden}
              ></label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Ícone para alternar visibilidade da senha */}
              <span
                className={styles.passwordToggleIcon}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <div className={styles.rememberMe}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Lembrar de mim</label>
            </div>

            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
            <button type="submit" className={styles.submitButton}>
              ENTRAR
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
