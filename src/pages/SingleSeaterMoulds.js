import React, { Component } from 'react';

import GalleryPopUp from '../components/common/popUp/GalleryPopUp';
import Loader from '../components/common/Loader';
import { LoadingMediaAlert } from '../components/common/loadingMediaAlert';
import { Redirect } from 'react-router-dom';
import SeaterItem from '../components/singleSeaterMoulds/SeaterItem';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import cx from 'classnames';
import { fetchSingleSeaterData } from './services/singleSeaterContentData';
import { fetchSingleSeaterImages } from './services/singleSeaterImages';
import { serverErrorAlert } from '../actions/actionsError';
import withToast from '../HOC/withToaster';

class SingleSeaterMoulds extends Component {
  state = {
    isLoading: true,
    page: {},
    seaterPhotos: [],
    popUpClosed: true,
    singleSeaterIndex: 0,
    singleSeater: null,
    hasError: false,
    popUpWindow: false,
  };

  _isMounted = false;

  fetchPageContent = async () => {
    try {
      const [content, images] = await Promise.all([
        fetchSingleSeaterData(),
        fetchSingleSeaterImages(),
      ]);
      if (this._isMounted) {
        this.setState({
          page: content,
          seaterPhotos: images,
          isLoading: false,
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
    this.fetchPageContent();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleOpenPopUp = (newIndex) => {
    const { seaterPhotos } = this.state;

    this.setState({
      singleSeaterIndex: newIndex,
      singleSeater: seaterPhotos[newIndex],
      popUpClosed: false,
      popUpWindow: true,
    });
  };

  handleClosePopUp = () => {
    this.setState({
      popUpClosed: true,
      popUpWindow: false,
    });
  };

  handleGoToNextPhoto = () => {
    const { singleSeaterIndex, seaterPhotos } = this.state;
    this.setState({
      singleSeaterIndex: singleSeaterIndex + 1,
      singleSeater: seaterPhotos[singleSeaterIndex + 1],
    });
  };

  disablePrevButton = () => {
    const { singleSeaterIndex } = this.state;
    return singleSeaterIndex <= 0;
  };

  disableNextButton = () => {
    const { singleSeaterIndex, seaterPhotos } = this.state;
    return singleSeaterIndex === seaterPhotos.length - 1;
  };

  handleGoToPrevPhoto = () => {
    const { singleSeaterIndex, seaterPhotos } = this.state;
    this.setState({
      singleSeaterIndex: singleSeaterIndex - 1,
      singleSeater: seaterPhotos[singleSeaterIndex - 1],
    });
  };

  render() {
    const {
      isLoading,
      seaterPhotos,
      page,
      popUpClosed,
      singleSeater,
      hasError,
      popUpWindow,
    } = this.state;
    const { acf = {} } = page;
    const customField = acf && !_isEmpty(acf) ? acf : null;
    if (hasError) {
      return <Redirect to='/page-error' />;
    }
    return (
      <Loader isLoading={isLoading}>
        <section
          data-section='primary'
          className={cx('section', 'top__indent-large')}
        >
          <div className={cx('container', 'fluid')}>
            <div className={cx('row')}>
              <div className={cx('col-xs-12')}>
                <header className='sectionHeader'>
                  <h2 className='sectionTitle'>Single seaters moulds</h2>
                </header>
              </div>
            </div>
          </div>
          <div className={cx('container', 'fluid')}>
            <div className={cx('row')}>
              {seaterPhotos.length || !_isEmpty(seaterPhotos) ? (
                <div className='col-xs-12'>
                  <header className='pagesHeader'>
                    <h3
                      className='h3'
                      dangerouslySetInnerHTML={{
                        __html: customField.seater_content,
                      }}
                    />
                  </header>
                  <div className='gridGallery'>
                    {seaterPhotos.map((seater, index) => (
                      <SeaterItem
                        key={seater.id}
                        index={index}
                        seater={seater}
                        handleOpenPopUp={this.handleOpenPopUp}
                        isLoading={isLoading}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className='col-xs-12'>
                  <h3 className='titleNotFound'>
                    Sorry...We could not find anything. <br /> However fetching
                    data may take some time
                  </h3>
                </div>
              )}
            </div>
          </div>
        </section>
        {!popUpClosed && (
          <GalleryPopUp
            popUpClosed={popUpClosed}
            currentGalleryItem={singleSeater}
            handleClosePopUpGallery={this.handleClosePopUp}
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
export default withToast(connect()(SingleSeaterMoulds));
