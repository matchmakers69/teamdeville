import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Styles.module.scss';
import withToast from '../../../HOC/withToaster';

const HomePageSliderItem = ({
  slide: {
    featuredImage: { mediaItemUrl },
  },
  slideIndex,
  photoIndex,
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${mediaItemUrl})` }}
      className={cx(
        styles.singleSlide,
        `${slideIndex === photoIndex ? styles.activeSlide : ''}`
      )}
    />
  );
};

HomePageSliderItem.propTypes = {
  slide: PropTypes.shape({
    featuredImage: PropTypes.shape({
      mediaItemUrl: PropTypes.string,
    }).isRequired,
  }),
  slideIndex: PropTypes.number.isRequired,
  photoIndex: PropTypes.number.isRequired,
};

export default withToast(HomePageSliderItem);
