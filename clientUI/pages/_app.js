import "../styles/globals.css";
import Header from "../components/UI/Header";
function MyApp({ Component, pageProps }) {
  return <div>
    <Header></Header>
    <Component {...pageProps} />
    </div>;
}

export default MyApp;
