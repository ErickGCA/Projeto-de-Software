import React from "react";
import { Link } from "react-router-dom"; // Importando Link
import styles from "./MenuSecretaria.module.css";

function Menu() {
  const menuItems = [
    { text: "Agendamentos e Encaminhamentos", path: "/consultarhistoricoagen" }, // Ajuste o caminho conforme necessário
  ];

  return (
    <nav className={styles.menuContainer}>
      {menuItems.map((item, index) => (
        <Link key={index} to={item.path} className={styles.menuItem}>
          {item.text}
        </Link>
      ))}
    </nav>
  );
}

export default Menu;
