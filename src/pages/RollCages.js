import React, { Component } from 'react';

import CageItems from '../components/rollCages/CageItems';
import GalleryPopUp from '../components/common/popUp/GalleryPopUp';
import Loader from '../components/common/Loader';
import { LoadingMediaAlert } from '../components/common/loadingMediaAlert';
import { Redirect } from 'react-router-dom';
import RollCagesContent from '../components/rollCages/content/RollCagesContent';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import cx from 'classnames';
import { fetchRollCagesContent } from './services/rollCagesContent';
import { fetchrollCagesImages } from './services/rollCagesPhotos';
import { serverErrorAlert } from '../actions/actionsError';
import withToast from '../HOC/withToaster';

class RollCages extends Component {
  state = {
    isLoading: true,
    page: {},
    cagesPhotos: [],
    popUpClosed: true,
    singleCageIndex: 0,
    singleCage: null,
    hasError: false,
    popUpWindow: false,
  };

  _isMounted = false;

  fetchPageContent = async () => {
    try {
      const [cagesContent, cagesPhotos] = await Promise.all([
        fetchRollCagesContent(),
        fetchrollCagesImages(),
      ]);

      if (this._isMounted) {
        this.setState({
          page: cagesContent,
          cagesPhotos: cagesPhotos,
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
    const { cagesPhotos } = this.state;

    this.setState({
      singleCageIndex: newIndex,
      singleCage: cagesPhotos[newIndex],
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
    const { singleCageIndex, cagesPhotos } = this.state;
    this.setState({
      singleCageIndex: singleCageIndex + 1,
      singleCage: cagesPhotos[singleCageIndex + 1],
    });
  };

  disablePrevButton = () => {
    const { singleCageIndex } = this.state;
    return singleCageIndex <= 0;
  };

  disableNextButton = () => {
    const { singleCageIndex, cagesPhotos } = this.state;
    return singleCageIndex === cagesPhotos.length - 1;
  };

  handleGoToPrevPhoto = () => {
    const { singleCageIndex, cagesPhotos } = this.state;
    this.setState({
      singleCageIndex: singleCageIndex - 1,
      singleCage: cagesPhotos[singleCageIndex - 1],
    });
  };

  render() {
    const {
      isLoading,
      cagesPhotos,
      page,
      popUpClosed,
      singleCage,
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
                  <h2 className='sectionTitle'>Roll Cages</h2>
                </header>
              </div>
            </div>
          </div>
          <div className={cx('container', 'fluid')}>
            <div className={cx('row')}>
              {cagesPhotos.length > 0 && !_isEmpty(cagesPhotos) ? (
                <div className='col-xs-12'>
                  <header className='pagesHeader'>
                    <h3
                      className='h3'
                      dangerouslySetInnerHTML={{
                        __html: customField.roll_cages_extra_content,
                      }}
                    />
                  </header>
                  <div className='gridGallery'>
                    {cagesPhotos.map((cage, index) => (
                      <CageItems
                        key={cage.id}
                        index={index}
                        cage={cage}
                        handleOpenPopUp={this.handleOpenPopUp}
                        isLoading={isLoading}
                        popUpWindow={popUpWindow}
                      />
                    ))}
                  </div>
                  <RollCagesContent page={page} />
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
            currentGalleryItem={singleCage}
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
export default withToast(connect()(RollCages));
