// pages/authors/index.js
import Link from 'next/link';
import { MongoClient } from 'mongodb';
import styles from './Author.module.css';

const AuthorsPage = ({ authors }) => {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h1>Authors List</h1>
        <ul className={styles.authorList}>
          {authors.map((author) => (
            <li key={author.id} className={styles.authorCard}>
              <h2 className={styles.bookTitle}>{author.name}</h2>
              <p className={styles.authorBiography}>{author.biography}</p>
              <Link className={styles.bookTitle} href={`/Author/${author.id}` }>
                View Author Details
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('bookstore');
  const authors = await db.collection('authors').find().toArray();
  client.close();

  // Transform _id to string
  const authorsData = authors.map((author) => ({
    id: author.id.toString(),
    name: author.name,
    biography: author.biography,
  }));

  return {
    props: {
      authors: authorsData,
    },
  };
}

export default AuthorsPage;
