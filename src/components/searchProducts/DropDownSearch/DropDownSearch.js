import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Style.module.scss';

const DropDownSearch = ({ dropDownListProducts }) => {
  const renderDropDownList = (item) => {
    const { id, name, slug } = item;
    return (
      <li key={id} className={styles.dropDownListRow}>
        <Link to={`/product/${slug}`} className={styles.listLink}>
          <span>{name}</span>
        </Link>
      </li>
    );
  };

  return (
    <ul className={styles.dropDownList}>
      {dropDownListProducts.length > 0 &&
        dropDownListProducts.map(renderDropDownList)}
    </ul>
  );
};

DropDownSearch.propTypes = {
  dropDownListProducts: PropTypes.instanceOf(Array).isRequired,
};

export default DropDownSearch;
