import React from 'react';
import PropTypes from 'prop-types';
import styles from './Style.module.scss';
import { SearchSpinnerLoader } from '../common/SearchSpinnerLoader';

const InputQuickSearch = ({
  query,
  handleQuickSearchInputChange,
  loadingDropDown
}) => {
  return (
    <div className={styles.inputQuickSearchWrapper}>
      <input
        value={query}
        placeholder="Enter product's name min 3 characters"
        type='text'
        maxLength='40'
        onChange={e => handleQuickSearchInputChange(e)}
      />
      {loadingDropDown && <SearchSpinnerLoader />}
    </div>
  );
};

InputQuickSearch.propTypes = {
  query: PropTypes.string
};

export default InputQuickSearch;
