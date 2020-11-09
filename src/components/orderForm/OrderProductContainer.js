import React, { useState } from 'react';

import { Formik } from 'formik';
import OrderProductForm from './OrderProductForm';
import PropTypes from 'prop-types';
import constants from '../../constants';
import { postProductOrder } from '../../utils/woocommerce';
import { validationSchema } from '../../lib/validation/formValidationSchema';

const OrderProductContainer = ({
  purchasedProducts,
  values,
  showConfirmationPopUp,
  cleanShoppingCart,
  saveShippingDetails,
  history,
}) => {
  const { ALL_PRODUCTS } = constants;
  const [isSending, setIsSending] = useState(false);
  const SHOPPING_LIST_URL = /shopping-list/.test(window.location.pathname);

  const line_items = purchasedProducts.map((item) => {
    const { id, stock_quantity } = item;
    const quantityStock = stock_quantity === null ? 1 : stock_quantity;
    return {
      product_id: id,
      quantity: quantityStock,
    };
  });

  const handleSubmit = (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    const {
      firstName,
      lastName,
      address,
      city,
      state,
      postalCode,
      country,
      email,
    } = values;

    const productOrderData = {
      set_paid: false,
      billing: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        city,
        state,
        postcode: postalCode,
        country,
        email,
      },
      line_items,
    };

    const formValues = {
      firstName,
      lastName,
      email,
      feedback:
        'Hello Teamdeville, I have just placed an order on your Website Can you confirm that for me?',
    };
    setIsSending(true);

    postProductOrder(productOrderData)
      .then(() => {
        setIsSending(false);
        resetForm({});
        setStatus({ success: true });
        if (SHOPPING_LIST_URL) {
          saveShippingDetails(formValues);
        }
        showConfirmationPopUp();
        cleanShoppingCart();
      })
      .catch((error) => {
        console.log(error);
        setIsSending(false);
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ submit: error.message });
        history.push(ALL_PRODUCTS);
      });
  };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={values}
      >
        {(props) => <OrderProductForm isSending={isSending} {...props} />}
      </Formik>
    </>
  );
};

OrderProductContainer.propTypes = {
  purchasedProducts: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
};

export default OrderProductContainer;
