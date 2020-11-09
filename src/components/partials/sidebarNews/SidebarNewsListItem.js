import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Styles.module.scss';

const SidebarNewsListItem = ({
  post: { databaseId, title, content, date, author },
  closeNewsSidebar,
}) => {
  const excerptText = `${content.substring(0, 100)} ...`;

  const getPostPublishedDate = () => {
    let newDate = null;
    const now = moment(date);
    newDate = now.format('Do MMM YYYY');
    return newDate;
  };

  return (
    <>
      <header className={styles.headerDetails}>
        <div className={cx(styles.colDetails)}>
          <span className={styles.postDetails}>
            {`Published on: ${getPostPublishedDate()}`}
          </span>
          <span className={styles.postDetails}>
            {`Posted by: ${author.name}`}
          </span>
        </div>
      </header>
      <header className={styles.postHeader}>
        <h3 className={styles.postTitle}>{title}</h3>
      </header>
      <div className={styles.postBody}>
        <p
          dangerouslySetInnerHTML={{ __html: excerptText }}
          className={styles.postText}
        />
      </div>

      <Link
        onClick={() => closeNewsSidebar()}
        to={`/posts/${databaseId}`}
        className={cx('smallButton', styles.newsButton)}
      >
        <span className='button-text text-white'>Read more</span>
      </Link>
    </>
  );
};

SidebarNewsListItem.propTypes = {
  post: PropTypes.shape({
    databaseId: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.instanceOf(Object),
  }).isRequired,
};

export default SidebarNewsListItem;
