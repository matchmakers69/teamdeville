import React, { useState } from 'react';

import { Formik } from 'formik';
import PropTypes from 'prop-types';
import UpdateShippingForm from '../../components/updateDetailsForms/UpdateShippingForm';
import constants from '../../constants';
import { updateCustomerDetailsById } from '../../utils/woocommerce';
import { validationSchemaShipping } from '../../lib/validation/formValidationSchema';

const ShippingDetails = ({ shipping, id, getUsers, history }) => {
  const {
    first_name,
    last_name,
    address_1,
    postcode,
    city,
    country,
    state,
  } = shipping;
  const [isSending, setIsSending] = useState(false);

  const values = {
    firstName: first_name,
    lastName: last_name,
    address: address_1,
    country,
    city,
    postalCode: postcode,
    state,
  };

  const handleSubmitUpdateForm = async (values) => {
    const updateShippingDetailsObject = values;
    const {
      firstName,
      lastName,
      address,
      city,
      country,
      postalCode,
      state,
    } = updateShippingDetailsObject;
    const newShippingDetails = {
      shipping: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        city: city,
        country: country,
        postcode: postalCode,
        state: state,
      },
    };
    setIsSending(true);

    try {
      await updateCustomerDetailsById(id, newShippingDetails);
      setIsSending(false);

      if (!isSending) {
        getUsers();
      }
    } catch (error) {
      console.log(error);
      history.push(constants.PAGE_ERROR);
    }
  };
  return (
    <Formik
      validationSchema={validationSchemaShipping}
      onSubmit={handleSubmitUpdateForm}
      enableReinitialize={true}
      initialValues={values}
    >
      {(props) => <UpdateShippingForm isSending={isSending} {...props} />}
    </Formik>
  );
};

ShippingDetails.propTypes = {
  shipping: PropTypes.object,
  id: PropTypes.number,
  getUsers: PropTypes.func.isRequired,
};

export default ShippingDetails;
