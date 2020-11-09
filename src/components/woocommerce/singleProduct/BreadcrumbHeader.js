import React from 'react';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Styles.module.scss';

const BreadcrumbHeader = ({ categories, title }) => {
  const singleCategory =
    !isEmpty(categories) || !isNil(categories) ? categories[0] : {};
  const { name, slug } = singleCategory;

  if (!isEmpty(categories) || !isNil(categories)) {
    return (
      <header className={styles.breadCrumbHeader}>
        <ul className={styles.breadCrumbList}>
          <li>
            {' '}
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to={`/product-category/${slug}`}>{name}</Link>
          </li>
          <li>
            <span>{title}</span>
          </li>
        </ul>
      </header>
    );
  }
  return <div> No categories to display </div>;
};

BreadcrumbHeader.propTypes = {
  categories: PropTypes.array,
  title: PropTypes.string,
};

BreadcrumbHeader.defaultProps = {
  categories: [],
  title: 'Category title',
};

export default BreadcrumbHeader;
