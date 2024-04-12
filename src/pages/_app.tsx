import { AuthProvider } from "../data/context/AuthContext";
import "/src/styles/globals.css";
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
  // return <Component {...pageProps} />;
}
