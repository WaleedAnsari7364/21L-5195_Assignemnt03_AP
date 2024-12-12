
import Link from 'next/link';
import styles from './404.module.css';

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1_404}>404 - Page Not Found</h1>
      <p className={styles.p_404}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className={styles.link_404}>
        Go back to the homepage
      </Link>
    </div>
  );
};

export default Custom404;