import mockAxios from 'axios';

import { getProfileUsers } from '../getProfileUsers';

it('calls fetching users', async () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: [
        {
          id: 63,
          name: 'Alan Smith'
        }
      ]
    })
  );
  const users = await getProfileUsers('Alan');
  expect(users).toEqual([
    {
      id: 63,
      name: 'Alan Smith'
    }
  ]);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
