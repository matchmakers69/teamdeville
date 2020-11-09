import { shallow } from 'enzyme';

import React from 'react';
import SidebarNewsList from '../SidebarNewsList';

const posts = [
  {
    id: 'cG9zdDo0OTc3',
    databaseId: 4977,
    title: 'Covid-19 Update',
    slug: 'covid-19-update',
    date: '2020-04-28T09:43:19',
    content:
      '\n<p>These are strange, unprecedented times for the whole world and we hope that things ease up soon. We sincerely wish everyone to be safe and keep healthy.</p>\n\n\n\n<p>In the meantime, we are keeping on working and fulfilling orders &#8211; sometimes a bit slower than we would ideally like.  Stocks and suppliers have, generally, been very good but some items are getting hard to source. As an example, our supply of Lotus &#8216;short&#8217; steering arms has all but dried up. Our last pair went to the U.S.A. a few weeks back.  We are actively seeking new stocks as a matter of urgency.</p>\n\n\n\n<p>On a more upbeat note, we have had some great conversations and emails with customers and clients. It has been good to hear the renewed enthusiasm some people have had for their cars in this lockdown. We&#8217;ve heard of Anglia, Cortinas and even Lotus 7&#8217;s and Elans being resurrected after prolonged slumbers &#8211; don&#8217;t let up now you&#8217;ve started! </p>\n\n\n\n<p>All the very best, Paul &amp; Sarah @ TeamDeville</p>\n\n\n\n<p></p>\n',
    author: {
      name: 'teamDevilleAdmin',
      __typename: 'User',
    },
    __typename: 'Post',
  },
  {
    id: 'cG9zdDo0NTU2',
    databaseId: 4556,
    title: 'Welcome to new website',
    slug: 'welcome-to-new-website',
    date: '2019-10-15T22:15:03',
    content:
      '\nWelcome to the launch of the new and improved Teamdeville website. Here you will find the latest information on our products as well as the website itself. We hope you like our new look which is designed to make it easier to find the information that you are looking for. We will be updating this Blog on a regular basis to keep you in touch with all the new things happening at Teamdeville.\n\n\n\n<p></p>\n',
    author: {
      name: 'teamDevilleAdmin',
      __typename: 'User',
    },
    __typename: 'Post',
  },
];

describe('<SidebarNewsList>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SidebarNewsList posts={posts} />);
  });
  it('renders lists of posts', () => {
    expect(wrapper.find('article').length).toBe(2);
  });
});
