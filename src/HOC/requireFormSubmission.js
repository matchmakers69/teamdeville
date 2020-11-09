/* eslint-disable react/display-name */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import constants from '../constants';

const connector = connect((state) => ({
  isFormSentWithErrors: state.popUpState.emailHasErrors === true,
}));
const { CONTACT_US } = constants;
export default (WrappedComponent) => {
  return connector(
    class extends Component {
      static propTypes = {
        isFormSentWithErrors: PropTypes.bool.isRequired,
      };

      render() {
        const { isFormSentWithErrors, ...clearedProps } = this.props;
        if (isFormSentWithErrors) {
          return <WrappedComponent {...clearedProps} />;
        } else {
          return <Redirect to={{ pathname: CONTACT_US }} />;
        }
      }
    }
  );
};
