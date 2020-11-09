import React from 'react';
import PropTypes from 'prop-types';
import SidebarNewsList from './SidebarNewsList';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { GET_POSTS } from '../../../utils/graphql/queries';
import cx from 'classnames';
import showSpinnerIconIfLoading from '../../../utils/functions/renderSpinnerIcon';
import styles from './Styles.module.scss';
import { closeNewsSidebar } from '../../../stores/news/actions';

const SidebarNews = ({ sidebarOpen, closeNewsSidebar }) => {
  const { loading, error, data = {} } = useQuery(GET_POSTS);
  let posts = [];

  if (loading)
    return (
      <>
        <span data-test='loading-alert'>Loading news...</span>
        {showSpinnerIconIfLoading()}
      </>
    );
  if (error) return `Something went wrong: ${error}`;
  posts = data.posts.nodes;

  return (
    <aside
      data-test='sidebar-panel'
      className={cx(
        styles.navigationSidebar,
        `${sidebarOpen ? styles.panelInView : ''}`
      )}
    >
      <div className={styles.sidebarInner}>
        <header className={styles.headerSidebar}>
          <h2 className={styles.sidebarTitle}>Fresh news</h2>
          <button
            data-test='toggle-button'
            onClick={() => closeNewsSidebar()}
            className={styles.closeContainer}
            type='button'
          >
            <span className={styles.closeText}>close</span>
            <span className={styles.closePanelButton}>X</span>
          </button>
        </header>

        <div className={styles.sidebarContent}>
          <SidebarNewsList closeNewsSidebar={closeNewsSidebar} posts={posts} />
        </div>

        <footer className={styles.footerSidebar} />
      </div>
    </aside>
  );
};

SidebarNews.defaultProps = {
  closeNewsSidebar: () => {},
  sidebarOpen: false,
};

SidebarNews.propTypes = {
  closeNewsSidebar: PropTypes.func,
  sidebarOpen: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  ...state.newsState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    closeNewsSidebar: () => dispatch(closeNewsSidebar()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNews);
