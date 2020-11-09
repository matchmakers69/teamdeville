import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './Styles.module.scss';

const SubCategoriesButton = ({
  id,
  activeParentIndex,
  iconParent,
  navParentIndex,
  childrenArray,
  handleOpenSubNav,
  handleCloseSubNav,
  slug,
  categoryName,
}) => {
  return (
    <button
      type='button'
      className={cx(
        styles.mainListButton,
        `${
          navParentIndex === activeParentIndex ? styles.buttonParentActive : ''
        }`
      )}
      key={id}
      onClick={() => handleOpenSubNav(navParentIndex)}
    >
      <span className={styles.rowContainer}>
        {childrenArray.length > 0 ? (
          <span className={styles.textCategory}>{categoryName}</span>
        ) : (
          <span
            type='button'
            className={styles.buttonLink}
            onClick={() => handleCloseSubNav()}
          >
            <Link
              className={styles.textCategory}
              to={`/product-category/${slug}`}
            >
              {categoryName}
            </Link>
          </span>
        )}
        <span className={styles.iconArrowDown}>{iconParent}</span>
      </span>
    </button>
  );
};

SubCategoriesButton.propTypes = {
  handleCloseSubNav: PropTypes.func.isRequired,
  activeParentIndex: PropTypes.number.isRequired,
  navParentIndex: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default SubCategoriesButton;
