import React from 'react';
import PropTypes from 'prop-types';
import styles from './Styles.module.scss';
import SidebarNewsListItem from './SidebarNewsListItem';

const SidebarNewsList = ({ posts, closeNewsSidebar }) => {
  return (
    <section className={styles.articlesSection}>
      {posts.map((post) => {
        return (
          <article
            key={post.id}
            data-test='sidebarArticle'
            className={styles.newsArticle}
          >
            <SidebarNewsListItem
              closeNewsSidebar={closeNewsSidebar}
              post={post}
            />
          </article>
        );
      })}
    </section>
  );
};

SidebarNewsList.defaultProps = {
  closeNewsSidebar: () => {},
};

SidebarNewsList.propTypes = {
  posts: PropTypes.instanceOf(Array).isRequired,
  closeNewsSidebar: PropTypes.func.isRequired,
};

export default SidebarNewsList;
