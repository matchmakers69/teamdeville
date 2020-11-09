import React from 'react';
import { shallow } from 'enzyme';

import TestimonialsList from '../TestimonialsList';

const testimonials = [
  {
    id: 4278,
    date: '2019-08-29T09:20:49',
  },
  {
    id: 4277,
    date: '2019-08-29T09:20:25',
  },
  {
    id: 4276,
    date: '2019-08-29T09:19:32',
  },
  {
    id: 4275,
    date: '2019-08-29T09:18:16',
  },
];

describe('<TestimonialsList>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TestimonialsList testimonials={testimonials} />);
  });
  it('renders 4 testimonials', () => {
    expect(wrapper.find('[data-test="single-testimonial"]').length).toBe(4);
  });
});
