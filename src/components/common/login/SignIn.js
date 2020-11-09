import React from 'react';
import Label from '../forms/Label';
import Input from '../forms/Input';
import PropTypes from 'prop-types';
import ButtonSubmit from '../buttons/ButtonSubmit';

const SignIn = ({
  login,
  credentials: { username, password },
  onChange,
  handleSubmit,
  error,
  isSending,
  showLoginTipsModal,
  isDisabled,
}) => {
  return (
    <div className='col-xs-12 col-sm-6'>
      <header className='sectionHeader'>
        <h2 className='sectionTitle'>Login</h2>
      </header>

      <form
        data-test='LoginForm'
        onSubmit={(event) => handleSubmit(event, login)}
        autoComplete='off'
        className='loginForm'
      >
        <div className='formFieldSeparator'>
          <Label id='username' label='Username' />
          <Input
            id='username'
            label='Username'
            placeholder='Username max 20 characters'
            value={username}
            name='username'
            type='text'
            onChange={onChange}
            maxLength='20'
            data-test='login-username'
          />
        </div>

        <div className='formFieldSeparator'>
          <Label id='password' label='Password' />
          <Input
            id='password'
            label='Password'
            placeholder='Password'
            value={password}
            name='password'
            maxLength='30'
            type='password'
            data-test='login-password'
            onChange={onChange}
          />
        </div>
        <div className='formFieldSeparator'>
          <ButtonSubmit
            text='Login'
            type='submit'
            loadingLogin={isSending}
            data-test='submitButton'
            disabled={isDisabled}
          />
        </div>
        <div className='formFieldSeparator'>
          <p className='error-alert'>{error}</p>
        </div>
      </form>
      <button
        onClick={() => showLoginTipsModal()}
        className='popUpTipsBtn'
        type='button'
      >
        Login info
      </button>
    </div>
  );
};

SignIn.defaultProps = {
  error: '',
  handleSubmit: () => {},
  isSending: false,
  showLoginTipsModal: () => {},
  isDisabled: true,
};

SignIn.propTypes = {
  error: PropTypes.string.isRequired,
  credentials: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  showLoginTipsModal: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default SignIn;
