import React, { useEffect, useRef, useState } from 'react';
import {
  clearShoppingList as clearShoppingListActions,
  decrementQuantity as decrementQuantityActions,
  deletePurchasedProductFromCart as deletePurchasedProductFromCartActions,
  disableConatctFormAfterFormSent as disableConatctFormAfterFormSentActions,
  enableConatctFormAfterOrderSuccessful as enableConatctFormAfterOrderSuccessfulActions,
  incrementQuantity as incrementQuantityActions,
  onInputQuantityChange as onInputQuantityChangeActions,
} from '../../actions/actionsPurchasedProducts';
import {
  displayConfirmationModalAfterSubmission as displayConfirmationModalAfterSubmissionActions,
  resetShippingDetails as resetShippingDetailsActions,
  saveShippingDetails as saveShippingDetailsActions,
} from '../../actions/actionsWoo';

import CheckboxContactForm from '../../components/common/formikFields/CheckboxContactForm';
import { ContactForm } from '../../components/contactForm';
import Loader from '../../components/common/Loader';
import { OrderProductContainer } from '../../components/orderForm';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SingleProductInCart from '../../components/shoppingList/SingleProductInCart';
import _isEmpty from 'lodash/isEmpty';
import _isNull from 'lodash/isNull';
import { connect } from 'react-redux';
import constants from '../../constants';
import cx from 'classnames';
import { formSubmissionFailed as formSubmissionFailedActions } from '../../actions/actionsPopUpInfo';
import { getShoppingPageData } from './services/shoppingListPageContent';
import { getTotalCartShoppingList } from './services/productsCartTotal';
import { renderFormikShoppingListValues } from './services/shoppingListFormkiValues';
import { showPopup as showPopupActions } from '../../actions/actionsPopUpInfo';
import styles from './Styles.module.scss';
import { useFetch } from '../../HOOKS/useFetch';

const ShoppingList = ({
  purchasedProducts,
  showPopup,
  deletePurchasedProductFromCart,
  onInputQuantityChange,
  incrementQuantity,
  decrementQuantity,
  clearShoppingList,
  contactFormDisabled,
  enableConatctFormAfterOrderSuccessful,
  disableConatctFormAfterFormSent,
  displayConfirmationModalAfterSubmission,
  shippingDetails,
  saveShippingDetails,
  resetShippingDetails,
  formSubmissionFailed,
}) => {
  const {
    ORDER_TEXT_CONFIRMATION,
    ORDER_TEXT_REQUEST,
    EMAIL_SUBMISSION_SUCCESS,
    EMAIL_CONFIRMATION_DETAILS,
    ORDER_SUCCESSFUL,
    ORDER_SUCESSFUL_DESC,
    ORDER_CHECKBOX_ALERT,
  } = constants;

  const [contactFormFieldValues, setContactFormFieldValues] = useState(null);
  const componentIsMounted = useRef(true);

  // UPDATE FROM LOCAL STORAGE, AFTER ORDER FORM WAS SENT, INPUTS ARE POPULATED FROM LOCAL STORAGE
  useEffect(() => {
    setContactFormFieldValues(renderFormikShoppingListValues(shippingDetails));
  }, [shippingDetails]);

  const [credentials, setCredentials] = useState({
    isChecked: false,
    text: ORDER_CHECKBOX_ALERT,
  });

  const formsWrapperRef = useRef(null);
  const { isLoading, error, data } = useFetch(
    getShoppingPageData,
    componentIsMounted,
    {}
  );

  const handleViewPolicy = () => {
    showPopup({
      title: ORDER_SUCCESSFUL,
      description: ORDER_SUCESSFUL_DESC,
    });
  };

  const handleRemoveProductFromCart = (productId) => {
    deletePurchasedProductFromCart(productId);
  };

  const handleInputQuantityChange = (event, id) => {
    const { value } = event.target;
    const quantityInputValue = parseInt(value, 10);

    if (
      /^[0-9]+$/.test(quantityInputValue) &&
      !Number.isNaN(quantityInputValue)
    ) {
      onInputQuantityChange(id, quantityInputValue);
    }
  };

  const handleQuantityIncrement = (product) => {
    incrementQuantity(product);
  };

  const handleQuantityDecrement = (product) => {
    decrementQuantity(product);
  };

  const cleanShoppingCart = () => {
    clearShoppingList();
    enableConatctFormAfterOrderSuccessful();
  };

  const disableContactFormAfterSubmission = () => {
    disableConatctFormAfterFormSent();
  };

  const totalInCart = getTotalCartShoppingList(purchasedProducts);

  const showConfirmationPopUp = () => {
    displayConfirmationModalAfterSubmission({
      modalTitle: ORDER_TEXT_CONFIRMATION,
      modalDescription: ORDER_TEXT_REQUEST,
    });
  };

  const showModalAfterContactFormSent = () => {
    displayConfirmationModalAfterSubmission({
      modalTitle: EMAIL_SUBMISSION_SUCCESS,
      modalDescription: EMAIL_CONFIRMATION_DETAILS,
    });
  };

  const { content = 'PLEASE NOTE, WE DO NOT TAKE ONLINE PAYMENTS' } = data;

  const handleInputCheckboxChange = (e) => {
    const target = e.target;
    const { name, checked } = target;
    setCredentials((oldCredentials) => ({
      ...oldCredentials,
      [name]: checked,
    }));
  };

  const { isChecked, text } = credentials;
  const handleButtonResetValues = (isChecked) => {
    if (isChecked) {
      resetShippingDetails(null);
      setContactFormFieldValues(
        renderFormikShoppingListValues(shippingDetails)
      );
    }
  };

  const sendingEmailFailded = () => {
    formSubmissionFailed();
  };

  const handleScrollToBottomClick = () => {
    if (formsWrapperRef.current) {
      formsWrapperRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  if (error) {
    return <Redirect to='/page-error' />;
  }

  if (isLoading) {
    return <Loader data-test='pageLoader' isLoading={isLoading} />;
  }

  return (
    <>
      <section
        data-test='section-shopping'
        data-section='primary'
        className='section top__indent-large'
      >
        <div className='container fluid'>
          <div className='row'>
            <div className='col-xs-12'>
              <header className='sectionHeader'>
                <h2 className='sectionTitle'>Shopping list</h2>
              </header>
            </div>
            <div className='col-xs-12'>
              <h3>Total: {`£${totalInCart}`}</h3>
              <button
                data-test='policyButton'
                onClick={handleViewPolicy}
                type='button'
                className='popUpTipsBtn'
              >
                View Policy
              </button>
            </div>
            <div className='col-xs-12'>
              <div className={styles.buttonScrollContainer}>
                <button
                  type='button'
                  className={styles.scrollDownWrapper}
                  onClick={() => handleScrollToBottomClick()}
                >
                  Click here to fill the forms
                </button>
              </div>
            </div>
            <div className='col-xs-12 bottom-margin-col'>
              {!_isEmpty(data) && (
                <div
                  className={styles.shoppingSlogan}
                  dangerouslySetInnerHTML={{
                    __html: content.rendered,
                  }}
                />
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12 bottom-margin-col'>
              {!_isEmpty(purchasedProducts) && purchasedProducts.length > 0 ? (
                purchasedProducts.map((product) => (
                  <SingleProductInCart
                    key={product.id}
                    product={product}
                    price={product.price}
                    id={product.id}
                    name={product.name}
                    images={product.images}
                    stock_quantity={product.stock_quantity}
                    handleRemoveProductFromCart={handleRemoveProductFromCart}
                    handleInputQuantityChange={handleInputQuantityChange}
                    handleQuantityIncrement={handleQuantityIncrement}
                    handleQuantityDecrement={handleQuantityDecrement}
                  />
                ))
              ) : (
                <div className={styles.emptyCartWrapper}>
                  <h3 className='titleNotFound'>Your shopping list is empty</h3>
                </div>
              )}
            </div>

            <div ref={formsWrapperRef} className={styles.orderFormContainer}>
              {!_isNull(shippingDetails) && (
                <div className='col-xs-12 bottom-margin-col'>
                  <div className={styles.resetFormLacalStorage}>
                    <CheckboxContactForm
                      isChecked={isChecked}
                      text={text}
                      handleInputCheckboxChange={handleInputCheckboxChange}
                    />
                    {isChecked && (
                      <button
                        className={cx(
                          'submitAccountChangesButton',
                          styles.buttononResetForm
                        )}
                        onClick={() => handleButtonResetValues(isChecked)}
                      >
                        Reset fields
                      </button>
                    )}
                  </div>
                </div>
              )}
              <div
                className={cx(
                  'col-xs-12 col-md-6',
                  `${
                    purchasedProducts.length || contactFormDisabled
                      ? styles.divDisabled
                      : ''
                  }`
                )}
              >
                <section className={styles.orderDetailsText}>
                  <h3 className={styles.productTitleHeader}>
                    Please let us know about your order
                  </h3>
                  <p className={styles.formTextInfo}>{ORDER_TEXT_REQUEST}</p>
                </section>

                <ContactForm
                  showModalAfterContactFormSent={showModalAfterContactFormSent}
                  disableContactFormAfterSubmission={
                    disableContactFormAfterSubmission
                  }
                  values={contactFormFieldValues}
                  resetShippingDetails={resetShippingDetails}
                  sendingEmailFailded={sendingEmailFailded}
                />
              </div>
              {purchasedProducts.length > 0 && (
                <div className='col-xs-12 col-md-6'>
                  <section className={styles.orderDetailsText}>
                    <h3 className={styles.productTitleHeader}>
                      Please fill the shipping form
                    </h3>
                    <p className={styles.formTextInfo}>
                      Please make sure your order details are correct. <br />
                      All form fields should be filled.
                    </p>
                  </section>
                  <OrderProductContainer
                    values={contactFormFieldValues}
                    purchasedProducts={purchasedProducts}
                    cleanShoppingCart={cleanShoppingCart}
                    showConfirmationPopUp={showConfirmationPopUp}
                    saveShippingDetails={saveShippingDetails}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

ShoppingList.propTypes = {
  purchasedProducts: PropTypes.array.isRequired,
  showPopup: PropTypes.func.isRequired,
  enableConatctFormAfterOrderSuccessful: PropTypes.func.isRequired,
  disableConatctFormAfterFormSent: PropTypes.func.isRequired,
  formSubmissionFailed: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  purchasedProducts: state.cartState.purchasedProducts,
  contactFormDisabled: state.cartState.contactFormDisabled,
  shippingDetails: state.wooState.shippingDetails,
});

const mapDispatchToProps = (dispatch) => ({
  showPopup: (config) => dispatch(showPopupActions(config)),
  deletePurchasedProductFromCart: (productId) =>
    dispatch(deletePurchasedProductFromCartActions(productId)),
  onInputQuantityChange: (id, value) =>
    dispatch(onInputQuantityChangeActions(id, value)),
  incrementQuantity: (product) => dispatch(incrementQuantityActions(product)),
  decrementQuantity: (product) => dispatch(decrementQuantityActions(product)),
  clearShoppingList: () => dispatch(clearShoppingListActions()),
  enableConatctFormAfterOrderSuccessful: () =>
    dispatch(enableConatctFormAfterOrderSuccessfulActions()),
  disableConatctFormAfterFormSent: () =>
    dispatch(disableConatctFormAfterFormSentActions()),
  displayConfirmationModalAfterSubmission: (config) =>
    dispatch(displayConfirmationModalAfterSubmissionActions(config)),
  saveShippingDetails: (shippingDetails) =>
    dispatch(saveShippingDetailsActions(shippingDetails)),
  resetShippingDetails: (shippingDetails) =>
    dispatch(resetShippingDetailsActions(shippingDetails)),
  formSubmissionFailed: () => dispatch(formSubmissionFailedActions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
