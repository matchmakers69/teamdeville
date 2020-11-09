import React, { Component, createRef } from 'react';
import _debounce from 'lodash/debounce';
import styles from './Styles.module.scss';
import SlideItem from './SlideItem';

import cx from 'classnames';
import ButtonSlideNext, {
  SIZES,
  COLORS,
  TYPES,
} from '../common/buttons/ButtonSlideNext';
import ButtonSlidePrev from '../common/buttons/ButtonSlidePrev';

class LatestProductsRotator extends Component {
  state = {
    currentLatestProductIndex: 0,
    translateValue: 0,
    slideItemWidth: null,
  };

  slidesWrapperRef = createRef();
  handleWindowResize = this.handleWindowResize.bind(this);
  handleWindowResizeDebounced = _debounce(this.handleWindowResize, 80);

  getSliderContainerWidth = () => {
    const { current } = this.slidesWrapperRef;
    const sliderWrapperWidth = current.clientWidth;
    return sliderWrapperWidth;
  };

  initSlider = () => {
    this.setState({
      slideItemWidth: this.getSliderContainerWidth(),
    });
  };

  handleWindowResize() {
    const { currentLatestProductIndex } = this.state;
    const slideItemWidth = this.getSliderContainerWidth();
    const translateValue = currentLatestProductIndex * slideItemWidth * -1;

    this.setState({
      translateValue,
      slideItemWidth,
    });
  }

  componentDidMount = () => {
    this.initSlider();
    window.addEventListener('resize', this.handleWindowResizeDebounced);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleWindowResizeDebounced);
  };

  gotToPrevLatest = () => {
    const {
      currentLatestProductIndex,
      translateValue,
      slideItemWidth,
    } = this.state;
    if (currentLatestProductIndex !== 0) {
      this.setState({
        currentLatestProductIndex: currentLatestProductIndex - 1,
        translateValue: translateValue + slideItemWidth,
      });
    }
  };

  goToNextLatest = () => {
    const { latestProducts } = this.props;
    const { currentLatestProductIndex, slideItemWidth } = this.state;

    if (currentLatestProductIndex === latestProducts.length - 1) {
      return this.setState({
        currentLatestProductIndex: 0,
        translateValue: 0,
      });
    }
    this.setState({
      currentLatestProductIndex: currentLatestProductIndex + 1,
      translateValue: parseInt(
        `-${(currentLatestProductIndex + 1) * slideItemWidth}px`,
        10
      ),
    });
    return null;
  };

  disableButtonPrev = () => this.state.currentLatestProductIndex <= 0;

  disableButtonNext = () => false;

  render() {
    const { translateValue } = this.state;

    const { latestProducts } = this.props;
    return (
      <div className={styles.latestProductsSection}>
        <div className={styles.sliderWrapper}>
          <header className={cx('sectionHeader', styles.sliderHeader)}>
            <h3 className='subSectionTitle whiteTitle'>Latest Products</h3>
          </header>
          <div className={styles.buttonIndicatorsWrapperInner}>
            <ButtonSlidePrev
              handleButtonClick={this.gotToPrevLatest}
              type='button'
              buttonColor={COLORS.ORANGE}
              buttonSize={SIZES.MEDIUM}
              disabled={this.disableButtonPrev()}
              buttonType={TYPES.ROTATOR}
            />
            <ButtonSlideNext
              handleButtonClick={this.goToNextLatest}
              type='button'
              buttonColor={COLORS.ORANGE}
              buttonSize={SIZES.MEDIUM}
              buttonType={TYPES.ROTATOR}
              disabled={this.disableButtonNext()}
            />
          </div>

          <div className={styles.mainSliderLatest}>
            <div
              ref={this.slidesWrapperRef}
              style={{
                transform: `translateX(${translateValue}px)`,
                transition: 'transform ease-out 0.45s',
              }}
              className={styles.sliderWrapperInner}
            >
              {latestProducts.map((productArr, i) => (
                <SlideItem key={i} productArr={productArr} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LatestProductsRotator;
