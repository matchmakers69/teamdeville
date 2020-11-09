import React, { useEffect, useState } from 'react';

import HomePageSliderItem from '../slider/HomePageSliderItem';
import PropTypes from 'prop-types';
import Svg from '../../svg';
import _isEmpty from 'lodash/isEmpty';
import cx from 'classnames';
import styles from './Styles.module.scss';

const HomePageSlider = ({ slides }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const goToSlideDirection = (direction) => {
    if (direction === 'prev') {
      setSlideIndex(slideIndex - 1);
      if (slideIndex <= 0) {
        setSlideIndex(slides.nodes.length - 1);
      }
    } else {
      setSlideIndex(slideIndex + 1);
      if (slideIndex >= slides.nodes.length - 1) {
        setSlideIndex(0);
      }
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setSlideIndex(slideIndex + 1);
      if (slideIndex >= slides.nodes.length - 1) {
        setSlideIndex(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className={styles.sliderSectionInner}>
      <div className={styles.scrollDownContainer}>
        <div className={styles.scrollDown}>scroll down</div>
        <div className={styles.arrowDownWrapper}>
          <svg
            width='10'
            height='26'
            viewBox='0 0 25 44'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M14 38.5l8-8 2.5 2.5L13 44h-1L.5 33 3 30.5l8 8V0h3v38.5z'
              fill='#fff'
              fillRule='nonzero'
            ></path>
          </svg>
        </div>
      </div>
      <button
        onClick={() => goToSlideDirection('prev')}
        className={cx(styles.arrowSlider, styles.arrowPrev)}
        type='button'
      >
        <Svg name='arrowPrev' />
      </button>
      <button
        onClick={() => goToSlideDirection('next')}
        className={cx(styles.arrowSlider, styles.arrowNext)}
        type='button'
      >
        <Svg name='arrowNext' />
      </button>
      {!_isEmpty(slides.nodes) &&
        slides.nodes.map((slide, photoIndex) => {
          return (
            <HomePageSliderItem
              key={slide.id}
              slide={slide}
              photoIndex={photoIndex}
              slideIndex={slideIndex}
            />
          );
        })}
    </div>
  );
};

HomePageSlider.defaultProps = {
  slides: {},
};

HomePageSlider.propTypes = {
  slides: PropTypes.instanceOf(Object).isRequired,
};

export default HomePageSlider;
