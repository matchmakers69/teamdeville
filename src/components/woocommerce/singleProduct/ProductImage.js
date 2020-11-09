import React from 'react';
import Img from 'react-image';
import styles from './Styles.module.scss';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import SmallSpinner from '../../common/Loader/SmallSpinner';

const ProductImage = ({ images }) => {
  const imageObj = images.length > 0 ? images[0] : null;
  const src = !_isEmpty(imageObj) && imageObj.src;
  const alt = !_isEmpty(imageObj) ? imageObj.alt : "Product's image";
  const imagePosterSrc =
    'https://dummyimage.com/600x400/555/fff.jpg&text=Photo+coming+soon!';
  return (
    <figure className={styles.photoIconWrapper}>
      <Img
        loader={<SmallSpinner />}
        unloader={<img alt={alt} src={imagePosterSrc} />}
        src={src}
        alt={alt}
      />
    </figure>
  );
};

ProductImage.propTypes = {
  images: PropTypes.array.isRequired,
};

ProductImage.defaultProps = {
  images: [],
};

export default ProductImage;
