import axios from 'axios';
import { fetchSingleSeaterData } from '../services/singleSeaterContentData';

it('calls async data content fetch', async () => {
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: [
        {
          id: 4478,
          date: '2019-10-04T13:20:34',
          date_gmt: '2019-10-04T12:20:34',
        },
      ],
    })
  );

  const singleSeaterImages = await fetchSingleSeaterData();
  expect(singleSeaterImages).toEqual({
    id: 4478,
    date: '2019-10-04T13:20:34',
    date_gmt: '2019-10-04T12:20:34',
  });
  expect(axios.get).toHaveBeenCalledTimes(1);
});
