import React, { useEffect, useRef } from 'react';
import cx from 'classnames';

import { logoutUser as logoutUserActions } from '../stores/auth/actions';

import constants from '../constants';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsernameToken } from '../utils/tokens/tokens';

const LogoutPage = ({ logoutUser, history }) => {
  const { LOGIN_URL } = constants;

  const componentIsMounted = useRef(false);

  useEffect(() => {
    if (!componentIsMounted.current) {
      if (getUsernameToken() === null) {
        logoutUser();
        history.push(LOGIN_URL);
      }
    }
    return () => {
      componentIsMounted.current = true;
    };
  }, [LOGIN_URL, history, logoutUser]);

  return (
    <section
      data-test='logoutPage'
      data-section='primary'
      className={cx('section', 'top__indent-large')}
    >
      <div className={cx('container', 'fluid')}>
        <div className={cx('row')}>
          <div className='col-xs-12 col-sm-6'>
            <header className='sectionHeader'>
              <h2 className='sectionTitle'>Log Out</h2>
            </header>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  ...state.authState,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUserActions()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LogoutPage)
);
