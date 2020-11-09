import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './Styles.module.scss';

const FooterBckTop = () => (
  <section className={cx(styles.sectionFooterTop, styles.footerBck)}>
    <div className="container fluid full">
      <div className="row">
        <div className="col-xs-12">
          <header className="sectionHeader center-text">
            <h3 className="subSectionTitle border-full greyTitle">Drive with us</h3>
          </header>
        </div>
      </div>
    </div>
    <section className={styles.contentFooterSection}>
      <section className={styles.innerContent}>
        <h3 className={styles.sloganTitle}>Passion, Quality</h3>
        <button type="button" className="ctaButtonLarge borderOrange">
          <Link className="button-text-link" to="/all-products">view our products</Link>
        </button>
      </section>
    </section>
  </section>
);

export default FooterBckTop;