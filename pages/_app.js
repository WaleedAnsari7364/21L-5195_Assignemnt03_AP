import "@/styles/globals.css";
import { AuthProvider } from '../context/AuthContext';
import DarkModeToggle from './DarkModeToggle';

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
      <DarkModeToggle />
      <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
