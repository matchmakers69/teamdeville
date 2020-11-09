export const showPriceWithCurrency = (price) => {
  let priceWithCurrency = null;

  if (price && !Number.isNaN(Number(price))) {
    priceWithCurrency = `£${parseFloat(price).toFixed(2)}`;
  } else {
    priceWithCurrency = 'Ask for price';
  }

  return priceWithCurrency;
};
