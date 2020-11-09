import React from 'react';
import styles from './Styles.module.scss';

const RebuiltEngineContent = props => {
  const { page } = props;
  const { content } = page;
  return (
    <section className={styles.textSection}>
      <p className={styles.aboutText} dangerouslySetInnerHTML={{ __html: content.rendered }} />
    </section>
  );
};

export default RebuiltEngineContent;