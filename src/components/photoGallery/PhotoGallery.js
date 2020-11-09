import React, { Component } from 'react';

import GalleryPopUp from '../common/popUp/GalleryPopUp';
import Loader from '../common/Loader';
import { LoadingMediaAlert } from '../common/loadingMediaAlert';
import PhotoGalleryItem from './PhotoGalleryItem';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGalleryPhotos } from './services/photoGallery';
import { serverErrorAlert } from '../../actions/actionsError';
import styles from './Styles.module.scss';
import withToast from '../../HOC/withToaster';

class PhotoGallery extends Component {
  _isMounted = false;

  state = {
    gallery: [],
    galleryItemIndex: 0,
    currentGalleryItem: null,
    popUpClosed: true,
    isLoading: true,
    hasError: false,
    popUpWindow: false,
  };

  fetchPhotoGallery = async () => {
    this.setState({
      isLoading: true,
    });

    try {
      const response = await fetchGalleryPhotos();

      if (this._isMounted) {
        this.setState({
          isLoading: false,
          gallery: response,
        });
      }
    } catch (error) {
      this.setState({
        hasError: true,
        isLoading: false,
      });
      this.props.addToast('Something went wrong!', {
        appearance: 'error',
      });
      this.props.dispatch(serverErrorAlert());
    }
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.fetchPhotoGallery();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleOpenPopUpWithImage = (newIndex) => {
    const { gallery } = this.state;
    this.setState({
      galleryItemIndex: newIndex,
      currentGalleryItem: gallery[newIndex],
      popUpClosed: false,
      popUpWindow: true,
    });
  };

  handleClosePopUpGallery = () => {
    this.setState({
      popUpClosed: true,
      popUpWindow: false,
    });
  };

  handleGoToNextPhoto = () => {
    const { galleryItemIndex } = this.state;
    const { gallery } = this.state;
    this.setState({
      galleryItemIndex: galleryItemIndex + 1,
      currentGalleryItem: gallery[galleryItemIndex + 1],
    });
  };

  disablePrevButton = () => {
    const { galleryItemIndex } = this.state;
    return galleryItemIndex <= 0;
  };

  disableNextButton = () => {
    const { galleryItemIndex } = this.state;
    const { gallery } = this.state;
    return galleryItemIndex === gallery.length - 1;
  };

  handleGoToPrevPhoto = () => {
    const { galleryItemIndex } = this.state;
    const { gallery } = this.state;
    this.setState({
      galleryItemIndex: galleryItemIndex - 1,
      currentGalleryItem: gallery[galleryItemIndex - 1],
    });
  };

  render() {
    const {
      gallery,
      currentGalleryItem,
      popUpClosed,
      isLoading,
      hasError,
      popUpWindow,
    } = this.state;
    if (hasError) {
      return <Redirect to='/page-error' />;
    }

    return (
      <Loader data-test='pageLoader' isLoading={isLoading}>
        <div data-test='photo-gallery-section' className={styles.gridGallery}>
          {gallery.length > 0 ? (
            gallery.map((item, index) => (
              <PhotoGalleryItem
                key={item.id}
                item={item}
                index={index}
                handleOpenPopUpWithImage={this.handleOpenPopUpWithImage}
              />
            ))
          ) : (
            <div className='col-xs-12'>
              <h3 className='titleNotFound'>
                Sorry...We could not find anything. <br /> However fetching data
                may take some time
              </h3>
            </div>
          )}
        </div>
        {!popUpClosed && (
          <GalleryPopUp
            popUpClosed={popUpClosed}
            currentGalleryItem={currentGalleryItem}
            handleClosePopUpGallery={this.handleClosePopUpGallery}
            handleGoToPrevPhoto={this.handleGoToPrevPhoto}
            handleGoToNextPhoto={this.handleGoToNextPhoto}
            disablePrevButton={this.disablePrevButton}
            disableNextButton={this.disableNextButton}
          />
        )}
        {popUpWindow && <LoadingMediaAlert />}
      </Loader>
    );
  }
}
export default withToast(connect()(PhotoGallery));
