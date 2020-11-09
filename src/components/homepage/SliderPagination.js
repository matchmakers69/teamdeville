import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styles from './Styles.module.scss';
import SliderPaginationItem from './SliderPaginationItem';
import SmallSpinner from '../common/SmallSpinner';

const SliderPagination = props => {
  const { slides, currentSlideIndex, changeSlideOnClick } = props;
  return _.isEmpty(slides) ? (
    <SmallSpinner />
  ) : (
    <div className={styles.paginationWrapper}>
      {slides.map((pag, index) => (
        <SliderPaginationItem
          key={pag.id}
          pag={pag}
          index={index}
          currentSlideIndex={currentSlideIndex}
          changeSlideOnClick={changeSlideOnClick}
        />
      ))}
    </div>
  );
};

SliderPagination.propTypes = {
  slides: PropTypes.instanceOf(Array).isRequired,
  currentSlideIndex: PropTypes.number.isRequired,
};

export default SliderPagination;
