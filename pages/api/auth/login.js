export default function handler(req, res) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      if (email === 'waleedansari@gmail.com' && password === 'waleed123') {
        const user = { id: 1, email };
        const token = '123456789';
  
        return res.status(200).json({ user, token });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  
    res.status(405).json({ message: 'Method Not Allowed' });
  }
  