import PropTypes from 'prop-types';
import React from 'react';
import Svg from '../svg';
import styles from './Style.module.scss';

const SearchProductsInput = ({
  productsSearchQuery,
  handleSearchInputChange,
  handleSubmitSearchProducts,
  isSearchQueryValid,
}) => {
  return (
    <form onSubmit={handleSubmitSearchProducts} className={styles.searchForm}>
      <input
        data-test='searchInput'
        type='text'
        placeholder='Find your product'
        value={productsSearchQuery}
        onChange={handleSearchInputChange}
      />
      <button
        data-test='buttonSubmit'
        disabled={!isSearchQueryValid}
        className={styles.buttonSearch}
        type='submit'
      >
        <span className={styles.iconContainer}>
          <Svg name='searchIcon' />
        </span>
      </button>
    </form>
  );
};

SearchProductsInput.propTypes = {
  isSearchQueryValid: PropTypes.bool,
  handleSearchInputChange: PropTypes.func.isRequired,
  productsSearchQuery: PropTypes.string.isRequired,
};

SearchProductsInput.defaultProps = {
  isSearchQueryValid: false,
};

export default SearchProductsInput;
