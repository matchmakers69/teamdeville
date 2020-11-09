import React from "react";
import styles from "./Styles.module.scss";

const LoginErrors = ({ error }) => (
  <div className={styles.alertLogin}>
    <strong>{error}</strong>
  </div>
);

export default LoginErrors;
