
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db('bookstore');
      const genresCollection = db.collection('genres');
      const genres = await genresCollection.find().toArray();

      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching genres', error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
