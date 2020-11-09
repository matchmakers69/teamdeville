import React, { Component } from 'react';
import Loader from '../Loader';
import RegistrationForm from '../../registrationForm/RegistrationForm';
import { getUserObjectWithNonce } from '../../../utils/api/fetchUserInfoByNonce';
import styles from './Styles.module.scss';
import { withRouter } from 'react-router-dom';
import { fetchUserNonce } from './services/getNonce';
import * as emailjs from 'emailjs-com';
import constants from '../../../constants';
import { connect } from 'react-redux';
import { displayConfirmationModalAfterSubmission as displayConfirmationModalAfterSubmissionActions } from '../../../actions/actionsWoo';
import { renderObjectValidation } from './services/showErrorsFromValidation';

const EMAILREGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORDREGEX = /(?=.*[0-9])/;

class RegistrationContainer extends Component {
  state = {
    username: '',
    email: '',
    displayName: '',
    password: '',
    isLoading: true,
    error: '',
    errors: {
      username: '',
      email: '',
      displayName: '',
      password: '',
    },
  };

  componentDidMount = () => {
    this.setState({
      isLoading: false,
    });
  };

  showConfirmationPopUp = () => {
    const { REGISTRATION_SUCCESS_TITLE, REGISTRATION_SUCCESS_INFO } = constants;
    this.props.displayConfirmationModalAfterSubmission({
      modalTitle: REGISTRATION_SUCCESS_TITLE,
      modalDescription: REGISTRATION_SUCCESS_INFO,
    });
  };

  onRegistrationInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const { name, value } = target;
    const { errors } = this.state;

    renderObjectValidation(name, errors, value, EMAILREGEX, PASSWORDREGEX);

    this.setState({
      [name]: value,
      errors,
      error: '',
    });
  };

  disableRegistrationSubmitButton = (errors) => {
    const { username, email, displayName, password } = this.state;
    return (
      username.length > 0 &&
      email.length > 0 &&
      displayName.length > 0 &&
      errors.username.length === 0 &&
      errors.email.length === 0 &&
      errors.displayName.length === 0 &&
      errors.password.length === 0 &&
      password.length > 0
    );
  };

  getUserDataByNonce = async (nonce) => {
    const { username, email, displayName, password } = this.state;
    const { history } = this.props;
    const { LOGIN_URL } = constants;
    const dataObject = await fetchUserNonce(
      username,
      email,
      nonce,
      displayName,
      password
    );
    if (dataObject.status === 'ok') {
      this.showConfirmationPopUp();
      this.setState(
        {
          isLoading: false,
          username: '',
          email: '',
          displayName: '',
          password: '',
        },
        () => {
          setTimeout(() => {
            history.push(LOGIN_URL);
          }, 4500);
        }
      );
    } else {
      this.setState({
        isLoading: false,
        error: 'Something went wrong, please try fill the form again again',
      });
    }
  };

  fetchUserInfo = async () => {
    this.setState({
      isLoading: true,
    });
    try {
      const data = await getUserObjectWithNonce();
      this.getUserDataByNonce(data.nonce);
    } catch (error) {
      console.log(error);
    }
    return true;
  };

  sendFeedback = async (templateId, variables) => {
    try {
      if (emailjs) {
        await emailjs.send(
          'default_service',
          templateId,
          variables,
          'user_7Xq58eEK9C9yTWsGOFiQI'
        );
        this.setState({
          isLoading: false,
          username: '',
          email: '',
          displayName: '',
          password: '',
        });
      }
    } catch (err) {
      console.error(
        'Oh well, you failed. Here some thoughts on the error that occured:',
        err
      );
      this.setState({
        isLoading: false,
        username: '',
        email: '',
        displayName: '',
        password: '',
      });
    }
  };

  submitHandle = (event) => {
    const templateId = 'new_user_registration';
    event.preventDefault();
    this.fetchUserInfo();

    this.sendFeedback(templateId, {
      username: this.state.username,
      email: this.state.email,
      displayName: this.state.displayName,
    });
  };

  render() {
    const {
      username,
      email,
      displayName,
      errors,
      password,
      isLoading,
      error,
    } = this.state;
    const isEnabled = this.disableRegistrationSubmitButton(errors);
    return (
      <Loader isLoading={isLoading}>
        <section className={styles.registerSection}>
          <header className='sectionHeader'>
            <h1 className='sectionTitle'>About You</h1>
          </header>
          <RegistrationForm
            username={username}
            email={email}
            displayName={displayName}
            password={password}
            error={error}
            errors={errors}
            isEnabled={isEnabled}
            onRegistrationInputChange={this.onRegistrationInputChange}
            submitHandle={this.submitHandle}
          />
        </section>
      </Loader>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  displayConfirmationModalAfterSubmission: (config) =>
    dispatch(displayConfirmationModalAfterSubmissionActions(config)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(RegistrationContainer)
);
