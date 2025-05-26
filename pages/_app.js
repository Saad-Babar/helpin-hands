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
import '../admin-assets/scss/theme.scss';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(() => {
        fetch('/api/send-expiry-alerts')
      }, 1000 * 60 * 60 * 12) // every 12 hours

      return () => clearInterval(interval)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Helpin Hands</title>
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
