import Link from 'next/link';
import booksData from '/books.json';
import { useState } from 'react';
import styles from './FilterGenre.module.css'; 

const BooksList = ({ books, genres }) => {
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);

    if (genre === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book => book.genreId === genre);
      setFilteredBooks(filtered);
    }
  };

  return (
    <div className={styles.page}>
      <h1 >Filter Books By Genre</h1>
      <div>
        <label htmlFor="genre">Filter by Genre:</label>
        <select className={styles.genre_label} id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      <div className={styles.main}>
        {filteredBooks.length > 0 ? (
          <div className={styles.booksList}>
            {filteredBooks.map(book => (
              <div key={book.id} className={styles.bookCard}>
                <h2 className={styles.bookTitle}>{book.title}</h2>
                <p className={styles.bookPrice}>Price: ${book.price}</p>
                <p className={styles.bookRating}>Rating: {book.rating}</p>
                <div className={styles.ctas}>
                <Link href={`/books/${book.id}`}>
                  <button className={styles.genreButton}>View Details</button>
                </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No books available in this genre.</p>
        )}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const books = booksData.books;
  const genres = booksData.genres;

  return {
    props: {
      books,
      genres,
    },
  };
};

export default BooksList;
