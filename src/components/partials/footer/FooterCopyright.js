import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Styles.module.scss';
import Svg from '../../svg';

const currentYear = new Date().getFullYear();

const FooterCopyright = () => (
  <footer className={styles.footerContainer}>
    <div className="container fluid">
      <div className="row">
        <div className={cx(styles.footerSection, 'col-xs-12')}>
          <div className={cx(styles.footerInner, 'flex-container')}>
            <div className={cx(styles.footerColumn, styles.footerColumnCopyright)}>
              <p>Copyright &copy; {currentYear} Teamdeville</p>
            </div>
            <div className={cx('footerLinkWrapper', styles.footerColumn, styles.footerColumnLogo)}>
              <Link className={styles.footerLogoLink} to="/">
                <Svg name="logoDeville" />
              </Link>
            </div>
            <div className={cx(styles.footerColumn, styles.footerColumnWebsiteBy)}>
              <p>Website by Teamdeville</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default FooterCopyright;