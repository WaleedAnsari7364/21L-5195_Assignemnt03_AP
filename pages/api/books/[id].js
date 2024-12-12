// pages/api/books/[id].js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db('bookstore');
      const booksCollection = db.collection('books');

      
      const book = await booksCollection.findOne({ id: id });
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

     
      const author = await db.collection('authors').findOne({ id: book.authorId });

      res.status(200).json({ book, author });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
