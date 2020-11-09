import React from "react";
import RegistrationContainer from "../components/common/login/RegistrationContainer";
import cx from "classnames";

const CreateAccount = () => (
  <section
    data-section="primary"
    className={cx("section", "top__indent-large")}
  >
    <div className={cx("container", "fluid")}>
      <div className={cx("row")}>
        <div className={cx("col-xs-12")}>
          <RegistrationContainer />
        </div>
      </div>
    </div>
  </section>
);

export default CreateAccount;
