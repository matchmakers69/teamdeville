import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import constants from '../../constants';
import cx from 'classnames';
import {
  closeSearchPanelClick,
  fetchFoundProductsByParameter,
  inputSearchChange,
  openSearchPanelClick,
  redirectAfterSearch,
} from '../../stores/search/actions';
import { openPageFader, toggleFadingBody } from '../../stores/auth/actions';

import ButtonOpenSearchPanel from '../../components/common/buttons/ButtonOpenSearchPanel';
import { CategoriesDropDownButtonSwitcher } from '../categoriesDropDownButtonSwitcher';
import CategoriesMenu from './topNavigation/CategoriesMenu';
import { HeaderProductsButtons } from '../headerProductsButtons';
import PropTypes from 'prop-types';
import SearchProductsInput from '../searchProducts/SearchProductsInput';
import StaticMenu from './topNavigation/StaticMenu';
import Svg from '../svg';
import TopHeaderContactList from './TopHeaderContactList/TopHeaderContactList';
import { getFaderIsOpened } from '../../selectors/login/getFaderIsOpened';
import { getFavourites } from '../../selectors/favourites/getFavourites';
import { getPurchasedProducts } from '../../selectors/cart/getPurchasedProducts';
import { getSearchInputValue } from '../../selectors/woocommerce/getSearchInputValue';
import { getSearchPanelOpen } from '../../selectors/woocommerce/getSearchPanelOpen';
import { getSearchQueryValid } from '../../selectors/woocommerce/getSearchQueryValid';
import { serverErrorAlert as serverErrorAlertActions } from '../../actions/actionsError';
import styles from './Styles.module.scss';
const { HOME_PAGE } = constants;

class Header extends Component {
  state = {
    activeClass: 'fixed-header',
  };

  addClassHeaderScroll = this.addClassHeaderScroll.bind(this);

  addClassHeaderScroll() {
    let activeClass = cx('header-shrink', styles.headerShrink);
    if (window.pageYOffset <= 30) {
      activeClass = cx('header-large', styles.headerLarge);
    }
    this.setState({
      activeClass,
    });
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.addClassHeaderScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.addClassHeaderScroll);
  };

  onHandleCategoryMenu = () => {
    this.props.openPageFader();
  };

  onHandleOpenDropDownAccountLogin = (event) => {
    event.preventDefault();
    this.props.toggleFadingBody();
  };

  handleOpenSearchPanel = () => {
    const { openSearchPanelClick } = this.props;
    openSearchPanelClick();
  };

  handleCloseSearchPanel = () => {
    this.props.closeSearchPanelClick();
  };

  handleSearchInputChange = (e) => {
    const target = e.target;
    const { value } = target;
    this.props.inputSearchChange(value);
  };

  handleSubmitSearchProducts = (e, searchQuery) => {
    e.preventDefault();
    const { isSearchQueryValid } = this.props;
    const { history } = this.props;

    if (isSearchQueryValid) {
      this.props.fetchFoundProductsByParameter(searchQuery);
      this.props.redirectAfterSearch(history);
    }
  };

  render() {
    const { activeClass } = this.state;
    const {
      faderIsOpened,
      searchPanelOpened,
      favourites,
      purchasedProducts,
      isSearchQueryValid,
      bodyFade,
      productsSearchQuery,
    } = this.props;

    const userName = localStorage.getItem('userName');
    const user = userName !== '' && userName;

    if (/page-error/.test(window.location.pathname)) {
      return null;
    }

    return (
      <header
        id='masthead'
        className={cx(styles.topHeader, `${activeClass}`)}
        role='banner'
        data-test='headerMain'
      >
        <div
          className={cx(
            styles.searchContainer,
            `${searchPanelOpened ? styles.searchContainerActive : ''}`
          )}
        >
          <SearchProductsInput
            handleSearchInputChange={this.handleSearchInputChange}
            productsSearchQuery={productsSearchQuery}
            isSearchQueryValid={isSearchQueryValid}
            handleSubmitSearchProducts={this.handleSubmitSearchProducts}
          />

          <button
            data-test='button-testing-switch'
            onClick={() => this.handleCloseSearchPanel()}
            className={styles.iconClose}
            type='button'
            tabIndex='0'
          >
            <Svg name='crossIcon' />
            <span className={styles.srOnly} />
          </button>
        </div>

        <div
          className={cx(
            styles.contactDetailsWrapper,
            `${faderIsOpened || bodyFade ? styles.hidePanel : ''}`
          )}
        >
          <ButtonOpenSearchPanel
            handleOpenSearchPanel={this.handleOpenSearchPanel}
          />
          <a
            className={styles.lotusCortinaHeaderLink}
            rel='noopener noreferrer'
            target='_blank'
            href='http://cortinamk2.co.uk/'
          >
            <span className={styles.linkLargeDevice}>
              For Mk2 Cortina parts please click here
            </span>
            <span className={styles.linkSmallDevice}>Mk2 Cortina</span>
          </a>
          <TopHeaderContactList
            user={user}
            bodyFade={bodyFade}
            faderIsOpened={faderIsOpened}
            onHandleOpenDropDownAccountLogin={
              this.onHandleOpenDropDownAccountLogin
            }
          />
        </div>
        <section className={styles.menuLogoSection}>
          <div className='container fluid full'>
            <div className='row'>
              <div
                className={cx(
                  styles.headerSection,
                  'col-xs-12',
                  'flex-container',
                  'space-between'
                )}
              >
                <div className={styles.logoWrapper}>
                  <a
                    data-test='mainLogo'
                    href={HOME_PAGE}
                    className={styles.mainLogo}
                  >
                    <span className={styles.logoImg}>
                      <Svg name='logoDeville' />
                    </span>
                  </a>
                </div>
                <div className={styles.mainNavTopContainer}>
                  <HeaderProductsButtons
                    purchasedProducts={purchasedProducts}
                    favourites={favourites}
                  />
                  <div className={styles.topNavWrapper}>
                    <div className='header__dropdown-menu'>
                      <StaticMenu />
                      <CategoriesMenu faderIsOpened={faderIsOpened} />
                    </div>
                    <button
                      className={cx(
                        styles.categoriesContainer,
                        'flex-container',
                        'flex-end'
                      )}
                      type='button'
                      onClick={() => this.onHandleCategoryMenu()}
                    >
                      <CategoriesDropDownButtonSwitcher
                        faderIsOpened={faderIsOpened}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  bodyFade: state.authState.bodyFade,
  faderIsOpened: getFaderIsOpened(state),
  searchPanelOpened: getSearchPanelOpen(state),
  favourites: getFavourites(state),
  purchasedProducts: getPurchasedProducts(state),
  productsSearchQuery: getSearchInputValue(state),
  isSearchQueryValid: getSearchQueryValid(state),
});

const mapDispatchToProps = (dispatch) => ({
  openPageFader: () => dispatch(openPageFader()),
  toggleFadingBody: () => dispatch(toggleFadingBody()),
  openSearchPanelClick: () => dispatch(openSearchPanelClick()),
  closeSearchPanelClick: () => dispatch(closeSearchPanelClick()),
  inputSearchChange: (value) => dispatch(inputSearchChange(value)),
  fetchFoundProductsByParameter: () =>
    dispatch(fetchFoundProductsByParameter()),
  redirectAfterSearch: (history) => dispatch(redirectAfterSearch(history)),
  serverErrorAlert: () => dispatch(serverErrorAlertActions()),
});

Header.propTypes = {
  openPageFader: PropTypes.func.isRequired,
  toggleFadingBody: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
