import { useAuth } from '@/context/AuthContext';

export default function handler(req, res) {
  const { logout } = useAuth();
    if (req.method === 'POST') {
      logout(); 
      return res.status(200).json({ message: 'Logged out successfully' });
    }
  
    res.status(405).json({ message: 'Method Not Allowed' });
  }
  