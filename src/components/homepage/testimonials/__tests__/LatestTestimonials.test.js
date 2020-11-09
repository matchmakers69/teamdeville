import axios from 'axios';
import { getTestimonials } from '../services/LatestTestimonials';

it('testing async fetch for testimonials', async () => {
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: [
        {
          id: 4278,
          date: '2019-08-29T09:20:49',
          date_gmt: '2019-08-29T08:20:49',
          guid: {
            rendered:
              'http://shamlewtak.com/?post_type=testimonials&#038;p=4278'
          },
          modified: '2019-08-29T09:20:49',
          modified_gmt: '2019-08-29T08:20:49',
          slug: 'steve'
        }
      ]
    })
  );
  const testimonials = await getTestimonials();
  expect(testimonials).toEqual([
    {
      id: 4278,
      date: '2019-08-29T09:20:49',
      date_gmt: '2019-08-29T08:20:49',
      guid: {
        rendered: 'http://shamlewtak.com/?post_type=testimonials&#038;p=4278'
      },
      modified: '2019-08-29T09:20:49',
      modified_gmt: '2019-08-29T08:20:49',
      slug: 'steve'
    }
  ]);
});
