import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './AuthorDetails.module.css';
import { MongoClient } from 'mongodb';
import { useAuth } from '@/context/AuthContext'; 
import { useRouter } from 'next/router';

const AuthorDetails = ({ params }) => {
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    const fetchAuthorData = async () => {
      try {
        console.log(params.id)
        const res = await fetch(`/api/authors/${params.id}`);
        if (!res.ok) {
          throw new Error('Author not found');
        }
        const data = await res.json();
        setAuthor(data.author);
        setBooks(data.books);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAuthorData();
  }, [params.id]);

  if (error) {
    return <div className={styles.page}>Error: {error}</div>;
  }

  if (!author) {
    return <div className={styles.page}>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <h2>Books by {author.name}</h2>
      <div className={styles.bookList}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className={styles.bookCard}>
              <Link href={`/books/${book.id}`} className={styles.bookTitle}>
                {book.title}
              </Link>
            </div>
          ))
        ) : (
          <p>No books available for this author.</p>
        )}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  // Fetch all authors from the database
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('bookstore');
  const authors = await db.collection('authors').find().toArray();
  client.close();

  const paths = authors.map((author) => ({
    params: { id: author.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      params,
    },
    revalidate: 10,
  };
}

export default AuthorDetails;
