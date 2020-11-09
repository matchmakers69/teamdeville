import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { updateCustomerDetailsById } from '../../utils/woocommerce';
import UpdateBillingForm from '../../components/updateDetailsForms/UpdateBillingForm';
import constants from '../../constants';
import { validationSchemaBilling } from '../../lib/validation/formValidationSchema';

const BillingDetails = ({ getUsers, billing, id, history }) => {
  const { HOME_PAGE } = constants;

  const {
    first_name,
    last_name,
    address_1,
    country,
    email,
    postcode,
    city,
    state,
    phone,
  } = billing;
  const [isSending, setIsSending] = useState(false);

  const values = {
    firstName: first_name,
    lastName: last_name,
    address: address_1,
    country,
    city,
    postalCode: postcode,
    state,
    phone,
    email,
  };

  const handleSubmitUpdateForm = async (values) => {
    const updatedBillingDetailsObject = values;
    const {
      firstName,
      lastName,
      address,
      city,
      country,
      postalCode,
      email,
      state,
      phone,
    } = updatedBillingDetailsObject;
    const newBillingDetails = {
      billing: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        city: city,
        country: country,
        postcode: postalCode,
        state: state,
        phone: phone,
        email: email,
      },
    };
    setIsSending(true);

    try {
      await updateCustomerDetailsById(id, newBillingDetails);
      setIsSending(false);

      if (!isSending) {
        getUsers();
      }
    } catch (error) {
      console.log(error);
      history.push(HOME_PAGE);
    }
  };

  return (
    <Formik
      validationSchema={validationSchemaBilling}
      onSubmit={handleSubmitUpdateForm}
      enableReinitialize={true}
      initialValues={values}
    >
      {(props) => <UpdateBillingForm isSending={isSending} {...props} />}
    </Formik>
  );
};

BillingDetails.propTypes = {
  billing: PropTypes.object,
  id: PropTypes.number,
  getUsers: PropTypes.func.isRequired,
};

export default BillingDetails;
