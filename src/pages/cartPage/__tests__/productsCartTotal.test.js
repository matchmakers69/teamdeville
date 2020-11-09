import { getTotalCartShoppingList } from '../services/productsCartTotal';

it('print total in basket', () => {
  const total = '11.95';
  const purchasedProducts = [
    {
      price: '11.95',
      stock_quantity: 1,
    },
  ];
  const totalProducts = getTotalCartShoppingList(purchasedProducts, total);

  expect(totalProducts).toEqual(total);
});
