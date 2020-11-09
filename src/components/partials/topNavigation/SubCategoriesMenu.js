import { Link } from 'react-router-dom';
import React from 'react';
import cx from 'classnames';
import styles from './Styles.module.scss';

const SubCategoriesMenu = ({
  childrenArray,
  navParentIndex,
  activeParentIndex,
  handleCloseSubNav,
  subNavContentRef,
  showSubNavWrapper,
}) => {
  return (
    <nav
      style={{
        display:
          navParentIndex === activeParentIndex
            ? `${showSubNavWrapper}`
            : 'none',
      }}
      className={cx(
        styles.subHiddenNavWrapper,
        `${
          navParentIndex === activeParentIndex
            ? styles.subHiddenNavWrapperActive
            : ''
        }`
      )}
      ref={subNavContentRef}
    >
      <ul className={styles.subMenu}>
        {childrenArray.map((subItem) => (
          <li key={subItem.id}>
            <button
              type='button'
              onClick={() => handleCloseSubNav()}
              className={styles.subcategoryBtn}
            >
              <Link
                className={styles.subCategoryLink}
                to={`/product-category/${subItem.slug}`}
              >
                {subItem.name}
              </Link>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubCategoriesMenu;
