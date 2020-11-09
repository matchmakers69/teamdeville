import React from 'react';
import { shallow } from 'enzyme';
import HomePageContent from '../content/HomePageContent';
import { findByTestAttr } from '../../../../tests/testUtils';

const page = {
  id: 14,
  date: '2019-07-25T21:29:27',
  date_gmt: '2019-07-25T20:29:27',
  guid: {
    rendered: 'http://localhost:8888/teamwoo/?page_id=14',
  },
  modified: '2019-11-05T14:56:12',
  modified_gmt: '2019-11-05T14:56:12',
  slug: 'home-page',
  status: 'publish',
  type: 'page',
  link: 'http://teamdeville.co.uk/',
  title: {
    rendered: 'Classic race parts',
  },
  content: {
    rendered:
      '\nTeam Deville developed out of Tom Deville’s many years of racing Lotus Cortinas and Ford Anglias in historic and vintage race series. Finding and manufacturing increasingly hard to find parts to keep his cars on track led to this website and business. \nThe mission of Team Deville remains exactly the same today, but the range has expanded into a wider range of Fords and selected other makes. Now entering its 15th year, the day to day running of Team Deville is passing to Paul and Sarah Richards so Tom can kick back and take things a little easier – whilst remaining actively involved. Paul has extensive motor racing experience over many years and, with his wife Sarah, is keen to maintain Tom’s tradition of friendly help and excellent service while further expanding the range of parts and products available.\n',
    protected: false,
  },
  excerpt: {
    rendered:
      '<p>Team Deville developed out of Tom Deville’s many years of racing Lotus Cortinas and Ford Anglias in historic and vintage [&hellip;]</p>\n',
    protected: false,
  },
  author: 1,
  featured_media: 0,
  parent: 0,
  menu_order: 0,
  comment_status: 'closed',
  ping_status: 'closed',
  template: '',
  meta: [],
  acf: [],
  _links: {
    self: [
      {
        href: 'http://teamdeville.co.uk/wp-json/wp/v2/pages/14',
      },
    ],
    collection: [
      {
        href: 'http://teamdeville.co.uk/wp-json/wp/v2/pages',
      },
    ],
    about: [
      {
        href: 'http://teamdeville.co.uk/wp-json/wp/v2/types/page',
      },
    ],
    author: [
      {
        embeddable: true,
        href: 'http://teamdeville.co.uk/wp-json/wp/v2/users/1',
      },
    ],
    replies: [
      {
        embeddable: true,
        href: 'http://teamdeville.co.uk/wp-json/wp/v2/comments?post=14',
      },
    ],
    'version-history': [
      {
        count: 7,
        href: 'http://teamdeville.co.uk/wp-json/wp/v2/pages/14/revisions',
      },
    ],
    'predecessor-version': [
      {
        id: 4645,
        href: 'http://teamdeville.co.uk/wp-json/wp/v2/pages/14/revisions/4645',
      },
    ],
    'wp:attachment': [
      {
        href: 'http://teamdeville.co.uk/wp-json/wp/v2/media?parent=14',
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
  return shallow(<HomePageContent page={page} />);
};

describe('<HomePageContent/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it('renders HomePageContent component without crash', () => {
    expect(wrapper.length).toBe(1);
  });
  it('renders text from props', () => {
    const p = findByTestAttr(wrapper, 'homePageContent');
    expect(p).toHaveLength(1);
    const contentText = p.props().dangerouslySetInnerHTML.__html;
    expect(contentText).toBe(page.content);
  });
});
