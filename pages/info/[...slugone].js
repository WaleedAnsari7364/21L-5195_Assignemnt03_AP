import { useRouter } from 'next/router';
import styles from './info.module.css';

const InfoPage = () => {
  const router = useRouter();
  const { slugone } = router.query;
  console.log(slugone.id)
  if (Array.isArray(slugone)) {
    return (
      <div className={styles.page}>
      <div className={styles.main}>
      <div className={styles.infoCard}>
      <h1 className={styles.title}>{slugone.join(' / ').toUpperCase()}</h1>
        <p className={styles.description}> You are visiting the page: {slugone.join(' / ')}</p>
      </div>
      </div>
    </div>
    );
  }
};

export default InfoPage;
