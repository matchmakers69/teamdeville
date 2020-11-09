export const renderFormikShoppingListValues = (shippingDetails) => {
  const SHOPPING_LIST_URL = /shopping-list/.test(window.location.pathname);

  return {
    firstName:
      SHOPPING_LIST_URL && shippingDetails !== null && shippingDetails
        ? shippingDetails.firstName
        : '',
    lastName:
      SHOPPING_LIST_URL && shippingDetails !== null && shippingDetails
        ? shippingDetails.lastName
        : '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    email: '',
    feedback:
      'Hello Teamdeville, I have just placed an order on your Website Can you confirm that for me?',
    telephone: '',
  };
};
