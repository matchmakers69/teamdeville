import React from 'react';
import styles from './Styles.module.scss';
import requireFormSubmission from '../../HOC/requireFormSubmission';
import cx from 'classnames';
import { resetFormSubmissionFailed as resetFormSubmissionFailedActions } from '../../actions/actionsPopUpInfo';
import { Link } from 'react-router-dom';
import constants from '../../constants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const EmailError = ({ resetFormSubmissionFailed }) => {
  const { CONTACT_US } = constants;
  const resetEmailError = () => {
    resetFormSubmissionFailed();
  };
  return (
    <section data-section='primary' className='section top__indent-large'>
      <div className='container fluid'>
        <div className='row'>
          <div className='col-xs-12 bottom-margin-col'>
            <h3 className='titleNotFound'>
              Sorry... your message could not be sent
            </h3>
          </div>
          <div className='col-xs-12 margin-bottom'>
            <div className={styles.customersInfoWrapper}>
              <p>
                <span className={styles.clientsHeader}>Dear customer,</span>
                There was an error sending the previous message. <br />
                Please try again using our Contact Page Form,
                <br /> or email us directly
                <a
                  href='mailto: teamdeville@yahoo.com'
                  className={cx(styles.detailsLink, `${styles.emailLink}`)}
                >
                  <span className={styles.textLink}>teamdeville@yahoo.com</span>
                </a>
              </p>
              <div className={styles.buttonWrapper}>
                <Link
                  to={CONTACT_US}
                  onClick={() => resetEmailError()}
                  className={styles.tryAgainBtn}
                >
                  Try again
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

EmailError.propTypes = {
  resetFormSubmissionFailed: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetFormSubmissionFailed: () => dispatch(resetFormSubmissionFailedActions()),
});

export default requireFormSubmission(
  connect(null, mapDispatchToProps)(EmailError)
);
