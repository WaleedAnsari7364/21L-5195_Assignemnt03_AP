// pages/api/genres/[id]/books.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db('bookstore');
      const booksCollection = db.collection('books');
      
      // Find books by the genre id
      const books = await booksCollection.find({ genreId: id }).toArray();

      if (!books || books.length === 0) {
        return res.status(404).json({ message: 'No books found in this genre' });
      }

      // Get the genre name by id
      const genre = await db.collection('genres').findOne({ id });

      res.status(200).json({
        books,
        genreName: genre ? genre.name : 'Unknown Genre',
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books by genre', error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
