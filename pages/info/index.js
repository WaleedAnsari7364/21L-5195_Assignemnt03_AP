import React from 'react';
import styles from './info.module.css';

const InfoPageMain = () => {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
      <div className={styles.infoCard}>
      <h1 className={styles.title}>Information Page</h1>
      <p className={styles.description}>You are on the information page</p>
      </div>
      </div>
    </div>
  );
}

export default InfoPageMain;
