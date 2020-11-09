import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Styles.module.scss';
import DropdownLoginAccount from '../DropDownLoginAccount/DropdownLoginAccount';
import constants from '../../../constants';
import { getUsernameToken } from '../../../utils/tokens/tokens';

const TopHeaderContactList = ({
  faderIsOpened,
  bodyFade,
  onHandleOpenDropDownAccountLogin,
}) => {
  const { MY_ACCOUNT } = constants;
  return (
    <>
      <ul className={styles.contactDetailsList}>
        <li className={styles.detailsItem}>
          <a
            href='mailto: teamdeville@yahoo.com'
            className={cx(styles.detailsLink, `${styles.emailLink}`)}
          >
            <span className={cx(styles.iconWrapper, `${styles.emailIcon}`)} />
            <span className={styles.textLink}>teamdeville@yahoo.com</span>
          </a>
        </li>

        <li className={styles.detailsItem}>
          <a
            href='tel:+4407511801317'
            className={cx(styles.detailsLink, `${styles.tellLink}`)}
          >
            <span className={cx(styles.iconWrapper, `${styles.telIcon}`)} />
            <span className={styles.textLink}>+44 07511 801317</span>
          </a>
        </li>

        <li className={cx(styles.detailsItem, styles.dropDownAccount)}>
          <a
            href='#none'
            className={cx(
              styles.detailsLink,
              `${faderIsOpened ? styles.isNotActive : ''}`
            )}
            onClick={onHandleOpenDropDownAccountLogin}
          >
            <div className={styles.loginDetailsWrapper}>
              <span className={styles.loginText}>Login</span>
            </div>
          </a>
          {bodyFade && <DropdownLoginAccount bodyFade={bodyFade} />}
        </li>
        {getUsernameToken() !== null && (
          <li className={styles.detailsItem}>
            <Link
              to={MY_ACCOUNT}
              className={cx(styles.detailsLink, `${styles.userLink}`)}
            >
              <span className={cx(styles.iconWrapper, `${styles.userIcon}`)} />
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

TopHeaderContactList.propTypes = {
  purchasedProducts: PropTypes.array,
  favourites: PropTypes.array,
  bodyFade: PropTypes.bool,
  user: PropTypes.string,
  onHandleOpenDropDownAccountLogin: PropTypes.func,
};

export default TopHeaderContactList;
