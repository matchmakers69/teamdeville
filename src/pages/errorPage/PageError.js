import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import constants from '../../constants';
import cx from 'classnames';
import styles from './Styles.module.scss';

const PageError = ({ hasServerError }) => {
  if (!hasServerError) {
    return <Redirect to={constants.HOME_PAGE} noThrow />;
  }

  return (
    <section data-section='primary' className='section top__indent-large'>
      <div className='container fluid'>
        <div className='row'>
          <div className='col-xs-12 bottom-margin-col'>
            <h3 className='titleNotFound'>
              SERVER ERROR, CONTACT ADMINISTRATOR!
            </h3>
          </div>
          <div className='col-xs-12 margin-bottom'>
            <div className={styles.customersInfoWrapper}>
              <p>
                <span className={styles.clientsHeader}>Dear customer,</span>
                There was an error on the page. <br />
                <a
                  href='mailto: teamdeville@yahoo.com'
                  className={cx(styles.detailsLink, `${styles.emailLink}`)}
                >
                  <span className={styles.textLink}>teamdeville@yahoo.com</span>
                </a>
              </p>
              <div className={styles.buttonWrapper}>
                <Link to={constants.HOME_PAGE} className={styles.tryAgainBtn}>
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

PageError.propTypes = {
  hasServerError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.serverErrorState,
});

export default connect(mapStateToProps, null)(PageError);
