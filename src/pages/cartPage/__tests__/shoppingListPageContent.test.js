import mockAxios from 'axios';
import { getShoppingPageData } from '../services/shoppingListPageContent';

it('fetch page content for shopping list', async () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: [
        {
          slug: 'shopping-list',
          title: {
            rendered: 'Shopping list',
          },
        },
      ],
    })
  );
  const content = await getShoppingPageData('test');
  expect(content).toEqual({
    slug: 'shopping-list',
    title: {
      rendered: 'Shopping list',
    },
  });
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
