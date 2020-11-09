import PropTypes from 'prop-types';
import React from 'react';

const RegistrationForm = ({
  isEnabled,
  username,
  email,
  displayName,
  errors,
  password,
  error,
  onRegistrationInputChange,
  submitHandle,
}) => {
  return (
    <>
      <form
        data-test='formRegistration'
        onSubmit={submitHandle}
        autoComplete='off'
        className='registrationForm'
      >
        <div className='formFieldSeparator'>
          <label
            htmlFor='inputRegistrationUser'
            className='formLabel darkLabel'
          >
            Username
          </label>
          <input
            value={username}
            data-test='usernameInput'
            type='text'
            label='Username'
            placeholder='Username. Max 20 characters'
            name='username'
            id='inputRegistrationUser'
            onChange={(event) => onRegistrationInputChange(event)}
            maxLength='20'
          />
          {errors.username.length > 0 && (
            <span className='error'>{errors.username}</span>
          )}
        </div>
        <div className='formFieldSeparator'>
          <label htmlFor='registerEmail' className='formLabel darkLabel'>
            Email address:
          </label>
          <input
            value={email}
            type='email'
            label='Email'
            placeholder='Email'
            id='registerEmail'
            name='email'
            maxLength='40'
            onChange={(event) => onRegistrationInputChange(event)}
          />
          {errors.email.length > 0 && (
            <span className='error'>{errors.email}</span>
          )}
        </div>
        <div className='formFieldSeparator'>
          <label htmlFor='displayName' className='formLabel darkLabel'>
            Display name:
          </label>
          <input
            value={displayName}
            type='text'
            label='Display Name'
            placeholder='Default name (nickname). Max 20 characters'
            id='displayName'
            name='displayName'
            maxLength='20'
            onChange={(event) => onRegistrationInputChange(event)}
          />
          {errors.displayName.length > 0 && (
            <span className='error'>{errors.displayName}</span>
          )}
        </div>
        <div className='formFieldSeparator'>
          <label htmlFor='passwordInput' className='formLabel darkLabel'>
            Your password:
          </label>
          <input
            value={password}
            type='password'
            label='Password'
            placeholder='Password Max 30 characters'
            id='passwordInput'
            name='password'
            maxLength='30'
            onChange={(event) => onRegistrationInputChange(event)}
          />
          {errors.password.length > 0 && (
            <span className='error'>{errors.password}</span>
          )}
        </div>
        <div className='formFieldSeparator'>
          <button
            data-test='registrationButton'
            className='registrationButton'
            type='submit'
            disabled={!isEnabled}
          >
            Register
          </button>
        </div>
      </form>
      {error !== '' && <span className='errorRegistration'>{error}</span>}
    </>
  );
};

RegistrationForm.propTypes = {
  isEnabled: PropTypes.bool,
};

export default RegistrationForm;
