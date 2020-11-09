import React from 'react';
import cx from 'classnames';
import styles from './Styles.module.scss';
import PropTypes from 'prop-types';

const HomePageContent = ({ page }) => {
  return (
    <div className='col-xs-12'>
      <div className={cx(styles.colContent)}>
        <div className={styles.homePageContentWrapper}>
          <p
            className={styles.aboutText}
            data-test='homePageContent'
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </div>
  );
};

HomePageContent.defaultProps = {
  page: {},
};

HomePageContent.propTypes = {
  page: PropTypes.instanceOf(Object),
};

export default HomePageContent;
