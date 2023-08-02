import React from 'react';
import styles from '../styles/components/modal_loading.module.scss';

const LoadingModal = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.loader}></div>
        <p>Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
