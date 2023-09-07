// pages/_app.tsx

import { wrapper } from "@/store/root";
import "../css/scroll-bars.css";
import "tailwindcss/tailwind.css";
import "../globals.css";
// Import any other global CSS

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
