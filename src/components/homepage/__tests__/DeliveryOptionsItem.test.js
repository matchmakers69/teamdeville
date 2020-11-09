import React from 'react';
import { shallow } from 'enzyme';
import DeliveryOptionsItem from '../../homepage/DeliveryOptionsItem';
import { findByTestAttr } from '../../../../tests/testUtils';

const deliveryItem = {
  id: 4252,
  date: '2019-08-19T15:00:21',
  date_gmt: '2019-08-19T14:00:21',
  guid: {
    rendered: 'http://shamlewtak.com/?post_type=delivery&#038;p=4252',
  },
  modified: '2019-08-19T15:00:23',
  modified_gmt: '2019-08-19T14:00:23',
  slug: 'worldwide-deliveries',
  status: 'publish',
  type: 'delivery',
  link: 'http://teamdeville.co.uk/posts/delivery/worldwide-deliveries/',
  title: {
    rendered: 'Worldwide deliveries',
  },
  content: {
    rendered: '',
    protected: false,
  },
  excerpt: {
    rendered:
      '<p>All parts are despatched worldwide, usually on the same day as the parts are ordered these are sent by Air / Road and Sea. using UPS, TNT, and Nippon Express.</p>\n',
    protected: false,
  },
  featured_media: 0,
  template: '',
  acf: [],
  _links: {
    self: [
      {
        href: 'http://teamdeville.co.uk/wp-json/wp/v2/delivery/4252',
      },
    ],
    collection: [
      {
        href: 'http://teamdeville.co.uk/wp-json/wp/v2/delivery',
      },
    ],
    about: [
      {
        href: 'http://teamdeville.co.uk/wp-json/wp/v2/types/delivery',
      },
    ],
    'wp:attachment': [
      {
        href: 'http://teamdeville.co.uk/wp-json/wp/v2/media?parent=4252',
      },
    ],
    curies: [
      {
        name: 'wp',
        href: 'https://api.w.org/{rel}',
        templated: true,
      },
    ],
  },
};

const setup = () => {
  return shallow(
    <DeliveryOptionsItem
      excerpt={deliveryItem.excerpt}
      title={deliveryItem.title}
    />
  );
};

describe('<DeliveryOptionsItem />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it('renders component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('match text from props for option title', () => {
    const title = findByTestAttr(wrapper, 'deliveryOptionsHeader');
    expect(title).toHaveLength(1);
    const headerTitleText = title.props().dangerouslySetInnerHTML.__html;
    expect(headerTitleText).toBe(deliveryItem.title.rendered);
  });
});
