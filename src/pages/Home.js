import React, { useState, useEffect, useRef } from 'react';
import { getLatestProducts } from '../utils/woocommerce';
import _chunk from 'lodash/chunk';
import { useQuery } from '@apollo/react-hooks';
import { withRouter, Redirect } from 'react-router-dom';
import renderLoader from '../utils/functions/renderLoader';
import HomeLatestNews from '../components/homepage/latestNews/HomeLatestNews';
import Testimonials from '../components/homepage/testimonials/Testimonials';
import HomePageContent from '../components/homepage/content/HomePageContent';
import DeliveryOptions from '../components/homepage/DeliveryOptions';
import HomeSliderContainer from '../styles/HomeSliderContainer';
import HomePageSlider from '../components/homepage/slider/HomePageSlider';
import LatestProductsRotator from '../components/homepage/LatestProductsRotator';
import {
  slidesQuery,
  deliveryQuery,
  homePageContentQuery,
} from '../utils/graphql/queries';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [latestProducts, setLatestProducts] = useState([]);
  const componentIsMounted = useRef(false);

  useEffect(() => {
    const fetchLatestAddedProducts = async () => {
      try {
        const latestProducts = await getLatestProducts();
        const latestProductsChunked = _chunk(latestProducts, 4);
        if (!componentIsMounted.current) {
          setLatestProducts(latestProductsChunked);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLatestAddedProducts();
    return () => {
      componentIsMounted.current = true;
    };
  }, []);

  const {
    data: homeContent = {},
    loading: homePageContentQueryLoading,
    error: homePageContentQueryError,
  } = useQuery(homePageContentQuery, {
    variables: { slug: 'home-page' },
  });

  const {
    data: deliveryOptions = {},
    loading: deliveryQueryLoading,
    error: deliveryQueryError,
  } = useQuery(deliveryQuery);

  const {
    data: slides = {},
    loading: slidesQueryLoading,
    error: slidesQueryError,
  } = useQuery(slidesQuery);

  if (
    (slidesQueryLoading &&
      deliveryQueryLoading &&
      homePageContentQueryLoading) ||
    isLoading
  )
    return <>{renderLoader()}</>;
  if (slidesQueryError && deliveryQueryError && homePageContentQueryError)
    return <Redirect to='/page-error' />;

  return (
    <>
      <HomeSliderContainer>
        <HomePageSlider slides={slides.slides} />
      </HomeSliderContainer>
      <LatestProductsRotator latestProducts={latestProducts} />
      <HomeLatestNews />
      <DeliveryOptions deliveries={deliveryOptions.delivery} />
      <section data-test='homePageSection' className='mainSection'>
        <div className='container fluid full'>
          <div className='row'>
            <div className='col-xs-12'>
              <header className='sectionHeader center-text'>
                <h3 className='subSectionTitle border-full border-orange orangeTitle'>
                  About us
                </h3>
              </header>
            </div>
          </div>
          <div className='row'>
            <HomePageContent page={homeContent.page} />
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
};

export default withRouter(Home);
