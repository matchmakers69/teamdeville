import React, { useState, createRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { closePageFader as closePageFaderActions } from '../../../stores/auth/actions';
import { serverErrorAlert as serverErrorAlertActions } from '../../../actions/actionsError';
import _isEmpty from 'lodash/isEmpty';
import styles from './Styles.module.scss';
import SubCategoriesMenu from './SubCategoriesMenu';
import SubCategoriesButton from './SubCategoriesButton';
import Svg from '../../svg';
import CategoryPagesStaticMenu from './CategoryPagesStaticMenu';
import { getCategories } from '../../../utils/woocommerce';
import getNestedCategories from '../../../utils/woocommerceCategories';
import SmallSpinner from '../../common/Loader/SmallSpinner';
import withToast from '../../../HOC/withToaster';

const CategoriesMenu = ({
  faderIsOpened,
  closePageFader,
  addToast,
  serverErrorAlert,
}) => {
  const [activeParentIndex, setActiveParentIndex] = useState(-1);
  const [showSubNavWrapper, setshowSubNavWrapper] = useState('none');
  const subNavContentRef = createRef(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const componentIsMounted = useRef(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const productCategoriesData = JSON.parse(response.toJSON().body);
        const nestedProductCategories = getNestedCategories(
          productCategoriesData
        );

        if (!componentIsMounted.current) {
          setCategories(nestedProductCategories);
          setIsLoading(false);
        }
      } catch (error) {
        setHasError(true);
        addToast('Error when loading!', { appearance: 'error' });
        serverErrorAlert();
      }
    };
    fetchCategories();

    return () => {
      componentIsMounted.current = true;
    };
  }, [addToast, serverErrorAlert]);

  useEffect(() => {
    setshowSubNavWrapper('none');
    return () => {
      setshowSubNavWrapper('none');
    };
  }, []);

  const handleOpenSubNav = (subCategoryIndex) => {
    const currentIndex =
      activeParentIndex === subCategoryIndex ? -1 : subCategoryIndex;
    setActiveParentIndex(currentIndex);
    const currentSubHeightList =
      activeParentIndex === subCategoryIndex ? 'none' : 'block';
    setshowSubNavWrapper(currentSubHeightList);
  };

  const handleCloseSubNav = () => {
    closePageFader();
    setActiveParentIndex(-1);
    setshowSubNavWrapper('none');
  };

  const onRemovePageFader = () => {
    closePageFader();
  };

  const renderParentCategories = (category = {}, navParentIndex) => {
    const { id, slug } = category;
    const categoryName = category.name;
    const childrenArray = category.children;
    const iconParent = !_isEmpty(childrenArray) && childrenArray.length > 0 && (
      <Svg name='arrowDown' />
    );

    return (
      <div
        key={id}
        className={cx(
          styles.menuAccordionSection,
          `${
            !_isEmpty(childrenArray) && childrenArray.length > 0
              ? styles.hasChildrenSection
              : ''
          }`
        )}
      >
        <SubCategoriesButton
          slug={slug}
          id={id}
          categoryName={categoryName}
          childrenArray={childrenArray}
          iconParent={iconParent}
          activeParentIndex={activeParentIndex}
          navParentIndex={navParentIndex}
          handleCloseSubNav={handleCloseSubNav}
          handleOpenSubNav={handleOpenSubNav}
        />

        {!_isEmpty(childrenArray) && childrenArray.length > 0 && (
          <SubCategoriesMenu
            childrenArray={childrenArray}
            navParentIndex={navParentIndex}
            activeParentIndex={activeParentIndex}
            handleCloseSubNav={handleCloseSubNav}
            closePageFader={closePageFader}
            subNavContentRef={subNavContentRef}
            showSubNavWrapper={showSubNavWrapper}
          />
        )}
      </div>
    );
  };

  if (hasError) {
    return <Redirect to='/page-error' />;
  }

  if (isLoading) {
    return <SmallSpinner />;
  }

  return (
    <div
      className={cx(
        styles.categoriesMenu,
        `${faderIsOpened ? styles.menuActive : ''}`
      )}
    >
      <div className={styles.menuCatInner}>
        <div className={styles.sectionCategories}>
          <div className={styles.menuCategoryMain}>
            <div
              className={cx(
                styles.shadowPositioner,
                styles.shadowPositionerTop
              )}
            />
            <div
              className={cx(
                styles.shadowPositioner,
                styles.shadowPositionerBottom
              )}
            />
            <div className={styles.menuListWrapper}>
              <div className={styles.topCategoryList}>
                {categories.map(renderParentCategories)}
                <CategoryPagesStaticMenu
                  onRemovePageFader={onRemovePageFader}
                />
              </div>
            </div>
          </div>
        </div>
        <footer className={styles.footerCategories}>
          <span className={styles.footerLabel}>Find us:</span>
          <ul className={styles.socialMediaList}>
            <li>
              <Link to='/'>
                <Svg name='twitterIcon' />
              </Link>
            </li>
            <li>
              <Link to='/'>
                <Svg name='facebookIcon' />
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};
CategoriesMenu.propTypes = {
  faderIsOpened: PropTypes.bool.isRequired,
  closePageFader: PropTypes.func.isRequired,
  serverErrorAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  closePageFader: () => dispatch(closePageFaderActions()),
  serverErrorAlert: () => dispatch(serverErrorAlertActions()),
});

export default withToast(connect(null, mapDispatchToProps)(CategoriesMenu));
