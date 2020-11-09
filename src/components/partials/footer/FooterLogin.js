import { Link } from 'react-router-dom';
import React from 'react';
import constants from '../../../constants';
import cx from 'classnames';
import styles from './Styles.module.scss';

const FooterLogin = () => (
  <section className={cx(styles.sectionFooterTop, styles.footerLoginBck)}>
    <div className='container fluid full'>
      <div className='row'>
        <div className='col-xs-12'>
          <header className='sectionHeader center-text'>
            <h3 className='subSectionTitle border-full greyTitle'>
              Login or Register
            </h3>
          </header>
        </div>
      </div>
    </div>
    <section className={styles.contentFooterSection}>
      <section className={styles.innerContent}>
        <h3 className={styles.sloganTitle}>Login, register</h3>
        <button type='button' className='ctaButtonLarge borderOrange'>
          <Link className='button-text-link' to={constants.ALL_PRODUCTS}>
            view our products
          </Link>
        </button>
      </section>
    </section>
  </section>
);

export default FooterLogin;
