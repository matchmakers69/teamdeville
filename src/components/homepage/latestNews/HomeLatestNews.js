import React from 'react';
import { Link } from 'react-router-dom';
import constants from '../../../constants';
import { NEWS_LIMIT } from '../../../constants/news';
import cx from 'classnames';
import styles from './Style.module.scss';
import { useQuery } from '@apollo/react-hooks';
import { GET_POSTS } from '../../../utils/graphql/queries';
import showSpinnerIconIfLoading from '../../../utils/functions/renderSpinnerIcon';
import LatestNewsItem from './LatestNewsItem';

const HomeLatestNews = () => {
  const { loading, error, data = {} } = useQuery(GET_POSTS);
  let posts = [];
  if (loading || !data)
    return (
      <>
        <span data-test='loading-alert'>Loading news...</span>
        {showSpinnerIconIfLoading()}
      </>
    );

  if (error) return `Something went wrong: ${error}`;

  posts = data.posts.nodes;
  const latestNewsSliced = posts.slice(0, NEWS_LIMIT);
  return (
    <section
      data-test='latestNewsSection'
      className={cx('mainSection', 'greySection')}
    >
      <div className={cx('container', 'fluid')}>
        <div className='row'>
          <div className='col-xs-12'>
            <header className='sectionHeader center-text'>
              <h3 className='subSectionTitle border-full greyTitle'>
                Fresh news
              </h3>
            </header>
          </div>
        </div>

        <div className='row'>
          {latestNewsSliced.length > 0 ? (
            latestNewsSliced.map((post) => (
              <LatestNewsItem key={post.id} post={post} />
            ))
          ) : (
            <span>Sorry no slides yet ...</span>
          )}
        </div>
        <div className='row'>
          <div className={cx('col-xs-12', styles.buttonWrapper)}>
            <button type='button' className='ctaButtonLarge borderOrange'>
              <Link className='button-text-link' to={constants.LATEST_NEWS}>
                Read all news
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLatestNews;
