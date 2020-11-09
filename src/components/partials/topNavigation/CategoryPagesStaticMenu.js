import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Styles.module.scss';
import constants from '../../../constants';
import { categoryPagesMapper } from './services/CategoryPagesMenuMapper';
import PropTypes from 'prop-types';

const CategoryPagesStaticMenu = ({ onRemovePageFader }) => {
  const staticPagesArray = categoryPagesMapper(constants);
  return (
    <>
      {staticPagesArray.map((page, index) => (
        <div
          role='button'
          onClick={() => onRemovePageFader()}
          className={styles.menuAccordionSection}
          key={`page-${index + 1}`}
        >
          <Link className={styles.textCategory} to={page.path}>
            {page.title}
          </Link>
        </div>
      ))}
    </>
  );
};

CategoryPagesStaticMenu.propTypes = {
  onRemovePageFader: PropTypes.func.isRequired,
};

export default CategoryPagesStaticMenu;
