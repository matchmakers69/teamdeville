import React from 'react';
import styles from './Styles.module.scss';
import InputQuickSearch from '../woocommerce/woocommerceForms/InputQuickSearch';
import Select from '../woocommerce/woocommerceForms/Select';

function ProductFilters({
  filters: { searchQuery, sortPrice, sortPrices, categoryName, priceFrom },
  handleFiltersChange,
  categories,
  resetFilters
}) {
  return (
    <div className='row row-center-align'>
      <div className='col-xs-12  col-lg-3 bottom-margin-col'>
        <InputQuickSearch
          name='searchQuery'
          onChange={handleFiltersChange}
          value={searchQuery}
          placeholder='Search this section e.g Gearbox'
          label="Please start typing product's name"
          type='text'
        />
      </div>

      <div className='col-xs-12 col-lg-2 bottom-margin-col'>
        <InputQuickSearch
          name='priceFrom'
          onChange={handleFiltersChange}
          value={priceFrom}
          placeholder='£0.00'
          label='Price from '
          type='number'
          min='0'
          max='6000'
        />
      </div>

      <div className='col-xs-12 col-lg-3 bottom-margin-col'>
        <Select
          value={sortPrice}
          options={sortPrices}
          placeholder='Sort from lowest to highest price'
          name='sortPrice'
          onChange={handleFiltersChange}
          label='Please click the field to filter by price'
        />
      </div>

      {categories && (
        <div className='col-xs-12 col-lg-3 bottom-margin-col'>
          <Select
            value={categoryName}
            options={categories}
            placeholder='Select category'
            name='categoryName'
            onChange={handleFiltersChange}
            label='Please click the field to select category'
          />
        </div>
      )}
      <div className='col-xs-12  col-lg-1 bottom-margin-col'>
        <button
          className={styles.resetFiltersButton}
          onClick={() => resetFilters()}
          type='button'
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default ProductFilters;
