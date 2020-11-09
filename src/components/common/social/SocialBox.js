import React from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import cx from 'classnames';
import styles from './Styles.module.scss';
import Svg from '../../svg';

const SocialBox = props => {
  const { permalink } = props;
  return (
    <div className={styles.shareContainer}>
      <div className={styles.labelWrapper}>
        <span className={styles.labelTitle}>Share Product</span>
      </div>
      <ul className={styles.socialMediaList}>
        <li>
          <span className={styles.socialMediaLink}>
            <TwitterShareButton
              className={cx(styles.socialWrapper, styles.socialTwitter)}
              url={permalink}
            >
              <Svg name="twitterIcon" />
            </TwitterShareButton>
          </span>
        </li>
        <li>
          <span className={styles.socialMediaLink}>
            <FacebookShareButton
              className={cx(styles.socialWrapper, styles.socialFaceBook)}
              url={permalink}
            >
              <Svg name="facebookIcon" />
            </FacebookShareButton>
          </span>
        </li>
      </ul>

    </div>
  );
};

export default SocialBox;