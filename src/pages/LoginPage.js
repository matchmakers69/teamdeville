import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import SignIn from '../components/common/login/SignIn';
import RegistrationButton from '../components/common/login/RegistrationButton';
import { showPopup as showPopupActions } from '../actions/actionsPopUpInfo';
import constants from '../constants';
import { Mutation } from 'react-apollo';
import { SIGN_IN_USER } from '../utils/graphql/queries';
import { getUsernameToken, setUsernameToken } from '../utils/tokens/tokens';

const LoginPage = ({ loggedIn, showPopup, history }) => {
  const {
    HOME_PAGE,
    REGISTER_TIPS_TITLE,
    REGISTER_TIPS_DESCRIPTION,
    LOGIN_TIPS_TITLE,
    LOGIN_PAGE_TIPS_DESCRIPTION,
  } = constants;
  const componentIsMounted = useRef(false);

  useEffect(() => {
    if (!componentIsMounted.current) {
      if (getUsernameToken() !== null) {
        history.push(HOME_PAGE);
      }
    }
    return () => {
      componentIsMounted.current = true;
    };
  }, [HOME_PAGE, history, loggedIn]);

  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleLoginInputChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLoginSuccess = (response) => {
    setUsernameToken(response.data.login);

    setIsSending(false);
    setError('');
    setCredentials({
      username: '',
      password: '',
    });

    setTimeout(() => {
      history.push(HOME_PAGE);
    }, 300);
  };

  const handleLoginFail = (err) => {
    setIsSending(false);
    const errorSubmission = err.split('_').join(' ');

    setIsLoading(false);
    setError(errorSubmission);
    setCredentials({
      username: '',
      password: '',
    });
  };

  const handleSubmit = async (event, login) => {
    event.preventDefault();
    setIsSending(true);
    const { username, password } = credentials;
    await login({ variables: { username, password } })
      .then((response) => handleLoginSuccess(response))
      .catch((err) => handleLoginFail(err.graphQLErrors[0].message));
  };
  const validate = (username, password) => ({
    username: username.length === 0 || username.length <= 3,
    password: password.length === 0 || password.length <= 6,
  });

  const errors = validate(credentials.username, credentials.password);
  const isDisabled = Object.keys(errors).some((x) => errors[x]);

  const showRegisterTipsModal = () => {
    showPopup({
      title: REGISTER_TIPS_TITLE,
      description: REGISTER_TIPS_DESCRIPTION,
    });
  };

  const showLoginTipsModal = () => {
    showPopup({
      title: LOGIN_TIPS_TITLE,
      description: LOGIN_PAGE_TIPS_DESCRIPTION,
    });
  };

  return (
    <Mutation mutation={SIGN_IN_USER}>
      {(login) => (
        <section
          data-section='primary'
          className={cx('section', 'top__indent-large')}
          data-test='LoginPage'
        >
          <div className={cx('container', 'fluid')}>
            <div className={cx('row')}>
              <SignIn
                login={login}
                handleSubmit={handleSubmit}
                isSending={isSending}
                showLoginTipsModal={showLoginTipsModal}
                isDisabled={isDisabled}
                isLoading={isLoading}
                onChange={handleLoginInputChange}
                credentials={credentials}
                error={error}
              />
              <RegistrationButton
                showRegisterTipsModal={showRegisterTipsModal}
              />
            </div>
          </div>
        </section>
      )}
    </Mutation>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.authState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showPopup: (config) => dispatch(showPopupActions(config)),
  };
};

LoginPage.propTypes = {
  showPopup: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
