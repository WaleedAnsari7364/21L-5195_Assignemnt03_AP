// pages/api/authors/[id].js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      
      await client.connect();
      const db = client.db('bookstore');
     
      const author = await db.collection('authors').findOne({ id: id });
      
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }

      
      const books = await db.collection('books').find({ authorId: author.id }).toArray();

      res.status(200).json({ author, books });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching author data', error });
    } finally {
     
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
