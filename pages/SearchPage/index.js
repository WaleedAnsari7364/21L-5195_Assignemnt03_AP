import { useEffect, useState } from 'react';
import booksData from '/books.json'; 
import styles from './SearchPage.module.css';
import { useAuth } from '@/context/AuthContext'; 
import { useRouter } from 'next/router';

const SearchPage = () => {
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    const fetchRecentSearches = async () => {
      try {
        const response = await fetch('/api/userhistory');
        const data = await response.json();
        setRecentSearches(data.recentSearches || []);
      } catch (err) {
        console.error('Error fetching recent searches:', err);
      }
    };

    fetchRecentSearches();
  }, []);

  const handleSearch = async () => {
    const foundBook = booksData.books.find((b) => b.id.toString() === bookId);
    if (foundBook) {
      const author = booksData.authors.find((a) => a.id === foundBook.authorId);
      const genre = booksData.genres.find((g) => g.id === foundBook.genreId);
      
      const newSearch = {
        ...foundBook,
        author,
        genre,
      };

      setBook(newSearch);
      setError(null);

      try {
        await fetch('/api/userhistory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ searchData: newSearch }),
        });
      } catch (err) {
        console.error('Error storing search data:', err);
      }
    } else {
      setBook(null);
      setError('Book not found.');
    }
    setBookId('');
  };

  return (
    <div className={styles.page}>
      <div className={styles.searchContainer}>
        <h1>Search for a Book</h1>
        <input
          type="text"
          className={styles.inputField}
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          placeholder="Enter Book ID"
        />
        <button className={styles.searchButton} onClick={handleSearch}>Search</button>
      </div>

      {error && <p>{error}</p>}

      {book && (
        <div className={styles.bookDetailsCard}>
          <h2 className={styles.book_details_h2}>Book Details</h2>
          <h3 className={styles.bookTitle}>{book.title}</h3>
          <p className={styles.bookDescription}>Description: {book.description}</p>
          <p className={styles.bookPrice}>Price: ${book.price}</p>
          <p className={styles.bookRating}>Rating: {book.rating}</p>

          {book.author && (
            <div className={styles.authorDetails}>
              <h4 className={styles.book_details_h2} >Author Details</h4>
              <p className={styles.authorName}>Name: {book.author.name}</p>
              <p className={styles.authorBiography}>Biography: {book.author.biography}</p>
            </div>
          )}

          {book.genre && (
            <div className={styles.genreDetails}>
              <h4 className={styles.book_details_h2}>Genre Details</h4>
              <p className={styles.genreName}>Name: {book.genre.name}</p>
            </div>
          )}
        </div>
      )}

      {recentSearches.length > 0 && (
        <div className={styles.recentSearchesContainer}>
          <h2 className={styles.book_details_h2_rs} >Recent Searches</h2>
          {recentSearches.map((search) => (
            <div key={search.id} className={styles.recentSearchesCard}>
              <h3 className={styles.bookTitle}>{search.title}</h3>
              <p className={styles.bookDescription}>Description: {search.description}</p>
              <p className={styles.bookPrice}>Price: ${search.price}</p>
              <p className={styles.bookRating}>Rating: {search.rating}</p>

              {search.author && (
                <div className={styles.authorDetails}>
                  <h4>Author Details</h4>
                  <p className={styles.authorName}>Name: {search.author.name}</p>
                </div>
              )}

              {search.genre && (
                <div className={styles.genreDetails}>
                  <h4>Genre Details</h4>
                  <p className={styles.genreName}>Name: {search.genre.name}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
