import { ToastContainer } from 'react-toastify';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/index";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-modal-video/scss/modal-video.scss';
import '../styles/custom-animation.css'
import '../styles/animate.css'
import "../styles/icomoon.css";
import "../styles/fontawesome.css";
import '../styles/themify-icons.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/style.css'
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Gainioz - Charity & Donation Next Js Template</title>
      </Head>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        <ToastContainer />
      </PersistGate>
    </Provider>
    </div>

  )
}

export default MyApp