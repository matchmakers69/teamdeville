import ButtonSlideNext, {
  COLORS,
  SIZES,
  TYPES,
} from '../buttons/ButtonSlideNext.js';
import React, { useEffect, useRef, useState } from 'react';

import ButtonSlidePrev from '../buttons/ButtonSlidePrev';
import Img from 'react-image';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SmallSpinner from '../Loader/SpinnerIcon';
import { connect } from 'react-redux';
import cx from 'classnames';
import { fetchGalleryPhotos } from './services/galleryPhotos';
import { serverErrorAlert } from '../../../actions/actionsError';
import withToast from '../../../HOC/withToaster';

const GalleryPopUp = ({
  dispatch,
  addToast,
  currentGalleryItem: { featured_media },
  popUpClosed,
  handleClosePopUpGallery,
  handleGoToNextPhoto,
  disablePrevButton,
  handleGoToPrevPhoto,
  disableNextButton,
}) => {
  const componentIsMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [altImg, setAltImg] = useState('');
  const imagePosterSrc =
    'https://dummyimage.com/600x400/555/fff.jpg&text=Photo+coming+soon!';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const resPhotos = await fetchGalleryPhotos(featured_media);
        const { alt_text, media_details } = resPhotos;

        if (componentIsMounted.current) {
          setImgSrc(media_details.sizes.full.source_url);
          setAltImg(alt_text);
          setIsLoading(false);
        } else {
          // Did update here
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
    <div className={cx('overlay', `${!popUpClosed ? 'isActive' : ''}`)}>
      <button
        onClick={() => handleClosePopUpGallery()}
        type='button'
        className={cx('closePopUp', 'positionAbsolute')}
      >
        <span>X</span>
      </button>
      <div className='popup-dialog'>
        <ButtonSlidePrev
          handleButtonClick={handleGoToPrevPhoto}
          type='button'
          buttonColor={COLORS.ORANGE}
          buttonSize={SIZES.LARGE}
          buttonType={TYPES.SLIDER}
          disabled={disablePrevButton()}
        />

        <ButtonSlideNext
          disabled={disableNextButton()}
          type='button'
          buttonColor={COLORS.ORANGE}
          buttonSize={SIZES.LARGE}
          buttonType={TYPES.SLIDER}
          handleButtonClick={handleGoToNextPhoto}
        />
        <div className='dialog'>
          <Img
            loader={<SmallSpinner />}
            unloader={<img alt={altImg} src={imagePosterSrc} />}
            src={imgSrc}
            alt={altImg}
          />
        </div>
      </div>
    </div>
  );
};

GalleryPopUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  disableNextButton: PropTypes.func.isRequired,
  popUpClosed: PropTypes.bool.isRequired,
  handleClosePopUpGallery: PropTypes.func.isRequired,
  handleGoToNextPhoto: PropTypes.func.isRequired,
  handleGoToPrevPhoto: PropTypes.func.isRequired,
  disablePrevButton: PropTypes.func.isRequired,
};
export default withToast(connect()(GalleryPopUp));
