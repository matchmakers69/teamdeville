import React, { useEffect, useRef, useState } from 'react';

import BillingDetails from './BillingDetails';
import Loader from '../../components/common/Loader';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import ShippingDetails from './ShippingDetails';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import constants from '../../constants';
import cx from 'classnames';
import { getUsers } from '../../stores/profile/actions';
import { logoutUser as logoutUserActions } from '../../stores/auth/actions';
import { serverErrorAlert as serverErrorAlertActions } from '../../actions/actionsError';
import styles from './Styles.module.scss';
import withToast from '../../HOC/withToaster';
import { getUsernameToken } from '../../utils/tokens/tokens';

const MyAccount = ({
  customer,
  isLoading,
  getUsers,
  customer: { username, id, billing, shipping },
  error,
  addToast,
  serverErrorAlert,
  history,
  logoutUser,
}) => {
  const [hasError, setHasError] = useState(false);
  const { LOGIN_URL, HOME_PAGE } = constants;
  const componentIsMounted = useRef(true);

  const handleLogout = () => {
    logoutUser();
    history.push(LOGIN_URL);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (componentIsMounted.current) {
          if (getUsernameToken() === null) {
            history.push(HOME_PAGE);
          }
          await getUsers();
        }
      } catch (error) {
        setHasError(true);
        addToast('Something went wrong!', {
          appearance: 'error',
        });
        serverErrorAlert();
      }
    };
    fetchUsers();
    return () => {
      componentIsMounted.current = false;
    };
  }, [HOME_PAGE, addToast, getUsers, history, serverErrorAlert]);

  if (isLoading) {
    return <Loader data-test='preloader' isLoading={isLoading} />;
  }
  if (hasError) {
    return <Redirect to='/page-error' />;
  }
  return (
    <>
      {!isLoading && (
        <section
          data-test='section-account'
          data-section='primary'
          className='section top__indent-large'
        >
          <div className='container fluid'>
            <div className='row'>
              <div className='col-xs-12'>
                <header className='sectionHeader'>
                  <h1 className='sectionTitle'>My Account</h1>
                </header>
              </div>
            </div>
          </div>
          {error ? (
            <div className='container fluid'>
              <div className='row'>
                <div className='col-xs-12 col-md-12'>
                  <section className='pageInnerSection'>
                    <header className='pageHeader'>
                      <p className={styles.textIntro}>
                        <strong>
                          There might be a problem with your account page.
                        </strong>
                        <br />
                        We cannot recognize this user ID or password. Maybe you
                        are using this computer for very first time.
                      </p>

                      <button
                        data-test='logoutBtn'
                        onClick={() => handleLogout()}
                        className={styles.logoutButton}
                      >
                        Logout
                      </button>
                    </header>
                  </section>
                </div>
              </div>
            </div>
          ) : (
            <div className='container fluid'>
              <div className='row'>
                <div className='col-xs-12 col-md-12'>
                  <section className='pageInnerSection'>
                    <header className='pageHeader'>
                      <p className={cx(styles.textIntro, styles.bolderText)}>
                        Hello {username} (not {username}) -
                      </p>
                      <button
                        data-test='logoutBtn'
                        onClick={() => handleLogout()}
                        className={styles.logoutButton}
                      >
                        Logout
                      </button>
                      <p className={styles.textIntro}>
                        From your account dashboard you can view your recent
                        orders, manage your shipping and billing addresses
                      </p>
                    </header>
                  </section>
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-12 col-md-6'>
                  <header className='pageHeader'>
                    <h3>Billing Details:</h3>
                  </header>
                  {!_isEmpty(customer) && (
                    <BillingDetails
                      id={id}
                      billing={billing}
                      getUsers={getUsers}
                    />
                  )}
                </div>
                <div className='col-xs-12 col-md-6'>
                  <header className='pageHeader'>
                    <h3>Shipping Details:</h3>
                  </header>
                  {!_isEmpty(customer) && (
                    <ShippingDetails
                      id={id}
                      shipping={shipping}
                      getUsers={getUsers}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

MyAccount.propTypes = {
  getUsers: PropTypes.func.isRequired,
  serverErrorAlert: PropTypes.func.isRequired,
};

MyAccount.defaultProps = {
  customer: {
    username: 'username',
    billing: {},
    shipping: {},
    id: 1,
  },
};

const mapStateToProps = (state) => ({
  ...state.usersState,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  serverErrorAlert: () => dispatch(serverErrorAlertActions()),
  logoutUser: () => dispatch(logoutUserActions()),
});

export default withRouter(
  withToast(connect(mapStateToProps, mapDispatchToProps)(MyAccount))
);
