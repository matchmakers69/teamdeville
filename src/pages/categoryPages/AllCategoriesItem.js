import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Styles.module.scss';

const AllCategoriesItem = ({ category: { name, slug, children } }) => (
  <div className='col-xs-12 col-md-6 bottom-margin-col'>
    <div className={styles.innerCategoryContainer}>
      <div className={styles.categoriesWrapper}>
        <header className={styles.categoryHeader}>
          <h3 className={styles.categoryTitle}>{name}</h3>
        </header>
        {children.length ? (
          <ul className={styles.subNavList}>
            {children.map((subCat) => (
              <li key={subCat.id}>
                <Link
                  className={styles.subCategoryLink}
                  to={`/product-category/${subCat.slug}`}
                >
                  {subCat.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.buttonContainer}>
            <Link
              className={styles.textCategoryBtn}
              to={`/product-category/${slug}`}
            >
              {`View products from ${name}`}
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
);

AllCategoriesItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
};

export default AllCategoriesItem;
