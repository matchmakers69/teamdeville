import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SmallSpinner from '../common/Loader/SmallSpinner';
import { connect } from 'react-redux';
import { fetchSetersPhotos } from './services/singleSeaterPhotos';
import { serverErrorAlert } from '../../actions/actionsError';
import styles from './Styles.module.scss';
import withToast from '../../HOC/withToaster';

const SeaterItem = ({
  seater: { featured_media },
  index,
  handleOpenPopUp,
  addToast,
  dispatch,
}) => {
  const componentIsMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [altImg, setAltImg] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const resPhotos = await fetchSetersPhotos(featured_media);
        const { alt_text, media_details } = resPhotos;

        if (componentIsMounted.current) {
          setImgSrc(media_details.sizes.full.source_url);
          setAltImg(alt_text);
          setIsLoading(false);
        }
      } catch (error) {
        setHasError(true);
        addToast('Error when loading!', { appearance: 'error' });
        dispatch(serverErrorAlert());
      }
    };

    fetchImages();
    return () => {
      componentIsMounted.current = false;
    };
  }, [addToast, dispatch, featured_media]);

  if (hasError) {
    return <Redirect to='/page-error' />;
  }

  if (isLoading) {
    return <SmallSpinner />;
  }
  return (
    <button
      onClick={() => handleOpenPopUp(index)}
      type='button'
      className={styles.itemGrid}
    >
      <figure className={styles.imageContainer}>
        <img src={imgSrc} alt={altImg} />
      </figure>
    </button>
  );
};

SeaterItem.propTypes = {
  handleOpenPopUp: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
export default withToast(connect()(SeaterItem));
