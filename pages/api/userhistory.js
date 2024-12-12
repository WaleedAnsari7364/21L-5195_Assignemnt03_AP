import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { searchData } = req.body;

      await client.connect();
      const db = client.db('bookstore');
      
      await db.collection('recentSearches').insertOne(searchData);
      
      res.status(200).json({ message: 'Search stored successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error storing search data', error });
    } finally {
      await client.close();
    }
  } else if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db('bookstore');
      
      const recentSearches = await db.collection('recentSearches').find().limit(5).toArray();
      res.status(200).json({ recentSearches });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recent searches', error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
