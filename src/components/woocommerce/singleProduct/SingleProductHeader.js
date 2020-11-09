import React from 'react';
import cx from 'classnames';
import styles from './Styles.module.scss';
import Svg from '../../svg';

const SingleProductHeader = () => (
  <header className={styles.headerSingleProduct}>
    <div className={styles.innerHeaderRow}>
      <div className={cx(styles.headerColumn, styles.worldDelivery)}>
        <figure className={styles.iconWrapper}>
          <Svg name="planeIcon" />
        </figure>
        <h4 className={styles.deliveryHeader}>
            Worldwide delivery
        </h4>
      </div>
      <div className={cx(styles.headerColumn, styles.ukOvernight)}>
        <figure className={styles.iconWrapper}>
          <Svg name="truckIcon" />
        </figure>
        <h4 className={styles.deliveryHeader}>
            Uk overnight
        </h4>
      </div>
      <div className={cx(styles.headerColumn, styles.return30Days)}>
        <figure className={styles.iconWrapper}>
          <Svg name="truckIcon" />
        </figure>
        <h4 className={styles.deliveryHeader}>
            Return within 30 days
        </h4>
      </div>
    </div>
  </header>
);

export default SingleProductHeader;