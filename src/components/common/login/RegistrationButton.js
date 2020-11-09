import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import constants from "../../../constants";
import styles from "./Styles.module.scss";

const RegistrationButton = ({ showRegisterTipsModal }) => {
  const { REGISTRATION } = constants;
  return (
    <div className="col-xs-12 col-sm-6">
      <section className={styles.registerSectionWrapper}>
        <header className="sectionHeader">
          <h2 className="sectionTitle">New Customer</h2>
        </header>
        <div className={styles.buttonRegisterWrapper}>
          <button
            onClick={() => showRegisterTipsModal()}
            className="popUpTipsBtn"
            type="button"
          >
            Registration info
          </button>
          <button type="button" className="buttonLogin registerBtn">
            <Link className="loginButtonText" to={REGISTRATION}>
              Register
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
};

RegistrationButton.propTypes = {
  showRegisterTipsModal: PropTypes.func
};

export default RegistrationButton;
