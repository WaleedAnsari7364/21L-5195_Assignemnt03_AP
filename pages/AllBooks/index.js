import Link from 'next/link';
import styles from '/styles/Home.module.css';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const Home = ({ books }) => {
  const router = useRouter();
  const { user } = useAuth();
  const handleLogout = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`);
    if (res){ 
    router.push('/');
    }
  };
  return (
    
    <div className={styles.page}>
      <div className={styles.main}>
      {user && (
          <p className={styles.book_details_h1}>
            Logged in as: <strong>{user.email}</strong>
          </p>
        )}
        <h1 className={styles.book_details_h1}>Featured Books</h1>
        <ul>
          {books.length === 0 ? (
            <p>No books available.</p>
          ) : (
            books.map((book) => (
              <li key={book.id} className={styles.bookCard}>
                <h2 className={styles.bookTitle}>{book.title}</h2>
                <p className={styles.bookPrice}>Price: ${book.price}</p>
                <p className={styles.bookRating}>Rating: {book.rating}</p>
                <Link className={styles.book_details} href={`/books/${book.id}`}>
                  Book Details
                </Link>
                <Link className={styles.book_details} href={`/books/${book.id}/${book.authorId}`}>
                  Author Details
                </Link>
              </li>
            ))
          )}
        </ul>

        <div className={styles.ctas}>
          <button
            className={styles.genreButton}
            onClick={() => router.push('/Genre/genre')}
          >
            View Genres
          </button>
        </div>

        <div className={styles.ctas}>
          <button
            className={styles.genreButton}
            onClick={() => router.push('/filterbygenre')}
          >
            Filter By Genre
          </button>
        </div>

        <div className={styles.ctas}>
          <button
            className={styles.genreButton}
            onClick={() => router.push('/SearchPage')}
          >
            Search Page
          </button>
        </div>

        <div className={styles.ctas}>
          <button
            className={styles.genreButton}
            onClick={() => router.push('/Author')}
          >
            Author List
          </button>
        </div>

        <div className={styles.ctas}>
          <button
            className={styles.genreButton}
            onClick={handleLogout}
          >
            Log Out
          </button>
      </div>

        
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`);
    const data = await res.json();

    if (!res.ok || !data.books) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        books: data.books,
      },
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    return {
      notFound: true,
    };
  }
}

export default Home;
