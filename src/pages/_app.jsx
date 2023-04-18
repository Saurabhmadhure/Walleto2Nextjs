// import { SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    // <SSRProvider>
    <Component {...pageProps} />
    // </SSRProvider>
  );
}

export default MyApp;
