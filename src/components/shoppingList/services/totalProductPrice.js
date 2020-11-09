export const calculateTotalProductPrice = (price, stock_quantity) => {
  let total = null;
  const quantity = stock_quantity === null ? 1 : stock_quantity;

  if (price && !Number.isNaN(Number(price))) {
    total = `£${(parseFloat(price) * quantity).toFixed(2)}`;
  } else {
    total = 'Ask for price';
  }

  return total;
};
