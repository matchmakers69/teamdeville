import React, { useEffect, useRef, useState } from 'react';

import AllCategoriesItem from './AllCategoriesItem';
import Loader from '../../components/common/Loader';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { getCategories } from '../../utils/woocommerce';
import getNestedCategories from '../../utils/woocommerceCategories';
import { serverErrorAlert } from '../../actions/actionsError';
import withToast from '../../HOC/withToaster';

const AllCategories = ({ addToast, dispatch }) => {
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [categoriesList, setCategories] = useState([]);
  const componentIsMounted = useRef(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        const allCategories = JSON.parse(categories.toJSON().body);
        const nestedCategories = getNestedCategories(allCategories);
        if (componentIsMounted.current) {
          setCategories(nestedCategories);
          setLoading(false);
        }
      } catch (error) {
        setHasError(true);
        addToast('Something went wrong!', { appearance: 'error' });
        dispatch(serverErrorAlert());
      }
    };
    fetchCategories();
    return () => {
      componentIsMounted.current = false;
    };
  }, [addToast, dispatch]);
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
                <h2 className='sectionTitle'>All categories</h2>
              </header>
            </div>
          </div>
        </div>
        <div className={cx('container', 'fluid')}>
          <div className={cx('row')}>
            {categoriesList.length ? (
              categoriesList.map((category) => (
                <AllCategoriesItem key={category.id} category={category} />
              ))
            ) : (
              <p>Sorry no categories here! </p>
            )}
          </div>
        </div>
      </section>
    </Loader>
  );
};

export default withToast(connect()(AllCategories));
