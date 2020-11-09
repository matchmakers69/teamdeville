import { fetchContactPageData } from '../services/contactPageData';
import mockAxios from 'axios';
import wordpressConfig from '../../utils/wordpress.config';

const URL = wordpressConfig.jsonUrl;
const CONTACT_PAGE_URL = `${URL}pages?slug=contact`;

it('calls fetching photos', async () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: [
        {
          id: 4353,
          slug: 'contact',
          status: 'publish',
          type: 'page',
        },
      ],
    })
  );
  const contactPageContent = await fetchContactPageData();
  expect(contactPageContent).toEqual({
    id: 4353,
    slug: 'contact',
    status: 'publish',
    type: 'page',
  });
  expect(mockAxios.get).toHaveBeenCalledTimes(1);

  expect(mockAxios.get).toHaveBeenCalledWith(CONTACT_PAGE_URL);
});
