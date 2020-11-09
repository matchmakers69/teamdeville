import axios from 'axios';
import { fetchSingleSeaterData } from '../services/singleSeaterContentData';
import wordpressConfig from '../../utils/wordpress.config';
const URL = wordpressConfig.jsonUrl;
const SINGLE_SEATER_PAGE_URL = `${URL}pages?slug=single-seater-moulds`;

it('calls async data content fetch', async () => {
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: [
        {
          id: 4479,
          slug: 'single-seater-moulds',
          status: 'publish',
        },
      ],
    })
  );

  const singleSeaterContent = await fetchSingleSeaterData();
  expect(singleSeaterContent).toEqual({
    id: 4479,
    slug: 'single-seater-moulds',
    status: 'publish',
  });
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(SINGLE_SEATER_PAGE_URL);
});
