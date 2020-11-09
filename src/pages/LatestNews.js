import React from 'react';
import { Redirect } from 'react-router-dom';
import LatestNewsItem from '../components/homepage/latestNews/LatestNewsItem';
import { useQuery } from '@apollo/react-hooks';
import { GET_POSTS } from '../utils/graphql/queries';
import constants from '../constants';
import renderLoader from '../utils/functions/renderLoader';
import cx from 'classnames';

const LatestNews = () => {
  const { loading, error, data = {} } = useQuery(GET_POSTS);
  let posts = [];

  if (loading) return <>{renderLoader()}</>;
  if (error) return <Redirect to={constants.PAGE_ERROR} />;
  posts = data.posts.nodes;

  return (
    <section
      data-section='primary'
      className={cx('section', 'top__indent-large')}
    >
      <div className={cx('container', 'fluid')}>
        <div className='row'>
          <div className='col-xs-12'>
            <header className='sectionHeader'>
              <h3 className='subSectionTitle orangeTitle'>Latest news</h3>
            </header>
          </div>
        </div>

        <div className='row'>
          {posts.map((post) => (
            <LatestNewsItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
