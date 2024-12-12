// pages/books/[id].js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './BookDetails.module.css';
import { MongoClient } from 'mongodb';
import { useAuth } from '@/context/AuthContext'; 
import { useRouter } from 'next/router';

const BookDetails = ({ params }) => {
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    const fetchBookData = async () => {
      try {
        const res = await fetch(`/api/books/${params.id}`);
        if (!res.ok) {
          throw new Error('Book not found');
        }
        const data = await res.json();
        setBook(data.book);
        setAuthor(data.author);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookData();
  }, [params.id]);

  if (error) {
    return <div className={styles.page}>Error: {error}</div>;
  }

  if (!book) {
    return <div className={styles.page}>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <h1>{book.title}</h1>
      <div className={styles.bookCard}>
        <p className={styles.bookDescription}>{book.description}</p>
        <p className={styles.bookPrice}>Price: ${book.price}</p>
        <p className={styles.bookRating}>Rating: {book.rating}</p>
        {author && <p className={styles.bookAuthor}>Author: {author.name}</p>}
        <Link href={`/books/${book.id}/${book.authorId}`}>
          View Author Information
        </Link>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  // Fetch all book IDs from the database
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('bookstore');
  const books = await db.collection('books').find().toArray();
  client.close();

  const paths = books.map((book) => ({
    params: { id: book.id.toString() },
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

export default BookDetails;
