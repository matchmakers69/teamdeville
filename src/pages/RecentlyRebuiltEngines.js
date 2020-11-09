import React, { Component } from 'react';

import EngineItems from '../components/recentlyRebuiltEngines/EngineItems';
import GalleryPopUp from '../components/common/popUp/GalleryPopUp';
import Loader from '../components/common/Loader';
import { LoadingMediaAlert } from '../components/common/loadingMediaAlert';
import RebuiltEngineContent from '../components/recentlyRebuiltEngines/content/RebuiltEngineContent';
import { Redirect } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import cx from 'classnames';
import { fetchEnginesContentData } from './services/rebuildEnginesContent';
import { fetchEnginesPhotos } from './services/rebuildEnginesPhotos';
import { serverErrorAlert } from '../actions/actionsError';
import withToast from '../HOC/withToaster';

class RecentlyRebuiltEngines extends Component {
  state = {
    isLoading: true,
    page: {},
    enginesPhotos: [],
    singleEngineIndex: 0,
    singleEngine: null,
    popUpClosed: true,
    hasError: false,
    popUpWindow: false,
  };

  _isMounted = false;

  fetchPageContent = async () => {
    try {
      const [engineContent, enginePhotos] = await Promise.all([
        fetchEnginesContentData(),
        fetchEnginesPhotos(),
      ]);
      if (this._isMounted) {
        this.setState({
          page: engineContent,
          enginesPhotos: enginePhotos,
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
    const { enginesPhotos } = this.state;

    this.setState({
      singleEngineIndex: newIndex,
      singleEngine: enginesPhotos[newIndex],
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
    const { singleEngineIndex, enginesPhotos } = this.state;
    this.setState({
      singleEngineIndex: singleEngineIndex + 1,
      singleEngine: enginesPhotos[singleEngineIndex + 1],
    });
  };

  disablePrevButton = () => {
    const { singleEngineIndex } = this.state;
    return singleEngineIndex <= 0;
  };

  disableNextButton = () => {
    const { singleEngineIndex, enginesPhotos } = this.state;
    return singleEngineIndex === enginesPhotos.length - 1;
  };

  handleGoToPrevPhoto = () => {
    const { singleEngineIndex, enginesPhotos } = this.state;
    this.setState({
      singleEngineIndex: singleEngineIndex - 1,
      singleEngine: enginesPhotos[singleEngineIndex - 1],
    });
  };

  render() {
    const {
      isLoading,
      enginesPhotos,
      page,
      popUpClosed,
      singleEngine,
      hasError,
      popUpWindow,
    } = this.state;
    const { acf = {} } = page;

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
                  <h2 className='sectionTitle'>Recently rebuilt engines</h2>
                </header>
              </div>
            </div>
          </div>
          <div className={cx('container', 'fluid')}>
            <div className={cx('row')}>
              {enginesPhotos.length > 0 && !_isEmpty(enginesPhotos) ? (
                <div className='col-xs-12'>
                  <header className='pagesHeader'>
                    <h3 className='h3'>{acf.title_two}</h3>
                  </header>
                  <div className='gridGallery'>
                    {enginesPhotos.map((engine, index) => (
                      <EngineItems
                        key={engine.id}
                        index={index}
                        engine={engine}
                        handleOpenPopUp={this.handleOpenPopUp}
                        isLoading={isLoading}
                      />
                    ))}
                  </div>
                  <RebuiltEngineContent page={page} />
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
            currentGalleryItem={singleEngine}
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
export default withToast(connect()(RecentlyRebuiltEngines));
