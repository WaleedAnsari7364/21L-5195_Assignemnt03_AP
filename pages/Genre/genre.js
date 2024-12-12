// pages/genres.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './genre.module.css';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch('/api/genres');
        if (!res.ok) {
          throw new Error('Failed to load genres');
        }
        const data = await res.json();
        setGenres(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGenres();
  }, []);

  if (error) {
    return <div className={styles.page}>Error: {error}</div>;
  }

  if (genres.length === 0) {
    return <div className={styles.page}>Loading genres...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h1 className={styles.genre_details_h1}>Genres</h1>
        {genres.map((genre) => (
          <div key={genre.id} className={styles.genreCard}>
            <h2 className={styles.genreTitle}>{genre.name}</h2>
            <p className={styles.genreId}>ID: {genre.id}</p>
            <h3 className={styles.books}>
              <Link href={`/Genre/${genre.id}`}>Books in this Genre</Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
