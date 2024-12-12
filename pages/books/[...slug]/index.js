import useSWR from 'swr';
import { useRouter } from 'next/router';
import styles from './Author.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

const AuthorPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  let author = null;
  const { data: booksData, error } = useSWR('/books.json', fetcher);

  if (!slug) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  if (!booksData) return <div>Loading...</div>;

  const bookId = slug[0];
  const authorIdFromUrl = slug[1];

  const book = booksData.books.find((b) => b.id.toString() === bookId);
  if (book && book.authorId === authorIdFromUrl) {
    author = booksData.authors.find((a) => a.id.toString() === authorIdFromUrl);
  }
  if (!author) return <div>Invalid path or Author not found</div>;

  return (
    <div className={styles.page}>
      <div className={styles.main}>
      <h1>Author Details</h1>
      <div className={styles.authorCard}>
        <h2 className={styles.bookTitle}>Author: {author.name}</h2>
        <p className={styles.authorBiography}>{author.biography}</p>
      </div>
      </div>
    </div>
  );
};

export default AuthorPage;
