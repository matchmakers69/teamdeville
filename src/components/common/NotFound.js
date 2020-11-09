import React from 'react';
import cx from 'classnames';

const NotFound = () => (
  <section
    data-section="primary"
    className={cx('section', 'top__indent-large')}
  >
    <div className={cx('container', 'fluid')}>

      <div className={cx('row')}>
        <div className="col-xs-12">
          <h3 className="titleNotFound">
           404 Sorry Page does not exist
          </h3>
        </div>
      </div>
    </div>
  </section>
);

export default NotFound;