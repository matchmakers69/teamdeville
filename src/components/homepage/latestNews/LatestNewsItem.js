import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styles from './Style.module.scss';

const LatestNewsItem = ({
  post: { databaseId, title, content, date, author },
}) => {
  const excerptText = `${content.substring(0, 200)} ...`;

  const getPostPublishedDate = () => {
    let newDate = null;
    const now = moment(date);
    newDate = now.format('Do MMM YYYY');
    return newDate;
  };
  return (
    <div className={cx('col-xs-12', 'col-md-6', 'col-lg-4')}>
      <div className={styles.innerPostWrapper}>
        <header className={styles.headerDetails}>
          <div className={cx(styles.colDetails)}>
            <span className={styles.postDetails}>
              {`Published on: ${getPostPublishedDate()}`}
            </span>
          </div>
          <div className={cx(styles.colDetails, styles.authorDetails)}>
            <span className={styles.postDetails}>
              {`Posted by: ${author.name}`}
            </span>
          </div>
        </header>
        <header className={styles.postHeader}>
          <h3 className={styles.postTitle}>{title}</h3>
        </header>
        <div className={styles.postBody}>
          <div
            dangerouslySetInnerHTML={{ __html: excerptText }}
            className={styles.postText}
          />
        </div>
        <div className='button-center-position'>
          <Link
            to={`/posts/${databaseId}`}
            className='ctaButtonBorder smallButton'
          >
            <span className='button-text text-orange'>Read more</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

LatestNewsItem.propTypes = {
  post: PropTypes.shape({
    databaseId: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.instanceOf(Object),
  }).isRequired,
};

export default LatestNewsItem;
