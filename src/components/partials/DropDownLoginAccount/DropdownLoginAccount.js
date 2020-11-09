import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getLoggedIn } from '../../../selectors/login/getLoggedIn';
import styles from './Styles.module.scss';
import {
  closeBodyFade as closeBodyFadeActions,
  logoutUser as logoutUserActions,
} from '../../../stores/auth/actions';
import { showPopup as showPopupActions } from '../../../actions/actionsPopUpInfo';
import _isNull from 'lodash/isNull';
import constants from '../../../constants';
import { getUsernameToken } from '../../../utils/tokens/tokens';

const DropdownLoginAccount = ({
  loggedIn,
  bodyFade,
  closeBodyFade,
  showPopup,
  logoutUser,
  history,
}) => {
  const { LOGIN_TIPS_TITLE, LOGIN_TIPS_DESCRIPTION, LOGIN_URL } = constants;

  const handleViemMoreLoginTips = () => {
    showPopup({
      title: LOGIN_TIPS_TITLE,
      description: LOGIN_TIPS_DESCRIPTION,
    });
  };

  const appUser =
    getUsernameToken() !== null && !_isNull(getUsernameToken())
      ? getUsernameToken()
      : {};
  const { authToken, user } = appUser;

  const userName = user ? user.name : '';
  const token = authToken;

  const handleLogout = () => {
    closeBodyFade();
    logoutUser();
    history.push(LOGIN_URL);
  };

  return (
    <div className={styles.dropDownLogin}>
      <div
        className={cx(
          styles.dropDownInner,
          `${bodyFade && styles.dropDownActive}`
        )}
      >
        <div className={styles.innerAccountHeader}>
          {!loggedIn && !token && (
            <button
              onClick={() => closeBodyFade()}
              type='button'
              className='buttonLogin loginBtn'
            >
              <Link className='loginButtonText' to='/login'>
                Login
              </Link>
            </button>
          )}
          {!loggedIn && !token && (
            <button
              onClick={() => closeBodyFade()}
              type='button'
              className='buttonLogin registerBtn'
            >
              <Link className='loginButtonText' to='/registration'>
                Register
              </Link>
            </button>
          )}
          {(loggedIn || token) && (
            <button
              onClick={() => handleLogout()}
              type='button'
              className='buttonLogin registerBtn'
            >
              <span className='loginButtonText'>Logout</span>
            </button>
          )}
        </div>
        <div className={styles.summaryHeader}>
          <div className={styles.loginTipsWrapper}>
            <button
              onClick={() => handleViemMoreLoginTips()}
              type='button'
              className={styles.loginTipsButton}
            >
              View login tips
            </button>
          </div>
          <button
            onClick={() => closeBodyFade()}
            type='button'
            className={styles.closeDropDownBtn}
          >
            Close
          </button>
          <div className={styles.loginDetailsContainer}>
            <span className={styles.loginText}>You are logged in as:</span>
            <span className={styles.userLoginWrapper}>
              {!_isNull(userName) ? userName : 'Guest'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: getLoggedIn(state),
});

const mapDispatchToProps = (dispatch) => ({
  closeBodyFade: () => dispatch(closeBodyFadeActions()),
  showPopup: (config) => dispatch(showPopupActions(config)),
  logoutUser: () => dispatch(logoutUserActions()),
});

DropdownLoginAccount.propTypes = {
  closeBodyFade: PropTypes.func.isRequired,
  bodyFade: PropTypes.bool.isRequired,
  showPopup: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DropdownLoginAccount)
);
