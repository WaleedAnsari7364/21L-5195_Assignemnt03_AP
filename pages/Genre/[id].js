// pages/genres/[id].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './genre.module.css';

const GenreBooks = () => {
  const [books, setBooks] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();  
  const { id } = router.query;  

  useEffect(() => {
    if (!id) return; 

    const fetchBooksByGenre = async () => {
      try {
        const res = await fetch(`/api/genres/${id}`);
        if (!res.ok) {
          throw new Error('Failed to load books');
        }
        const data = await res.json();
        setBooks(data.books);
        setGenreName(data.genreName);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBooksByGenre();
  }, [id]); 

  if (error) {
    return <div className={styles.page}>Error: {error}</div>;
  }

  if (!books.length) {
    return <div className={styles.page}>Loading books...</div>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.genre_details_h1}>Books in Genre: {genreName}</h1>
      <div className={styles.main}>
        <div className={styles.genreCardGenreBooks}>
          <ul className={styles.bookList}>
            {books.length > 0 ? (
              books.map((book) => (
                <li className={styles.bookTitle} key={book.id}>
                  <Link href={`/books/${book.id}`} className={styles.books}>
                    {book.title}
                  </Link>
                </li>
              ))
            ) : (
              <p>No books available in this genre.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GenreBooks;
