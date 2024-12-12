
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      
      await client.connect();
      const db = client.db('bookstore');
      const authorsCollection = db.collection('authors');

      
      const authors = await authorsCollection.find().toArray();
      
      
      res.status(200).json({ authors });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching authors', error });
    } finally {
     
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
