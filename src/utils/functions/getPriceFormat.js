export const convertPriceToStringWithCurrencySign = (price) => {
  let newPriceFormat = null;
  if (price && !Number.isNaN(Number(price))) {
    newPriceFormat = `£${parseFloat(price).toFixed(2)}`;
  } else {
    newPriceFormat = 'Ask for price';
  }
  return newPriceFormat;
};
