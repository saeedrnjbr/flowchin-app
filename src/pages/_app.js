import "@/styles/globals.css";
import { store } from "../store"
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
    <Toaster
      containerStyle={{
        top: 20,
        left: 20,
        bottom: 0,
        right: 20,
      }}
    />
  </Provider>;
}
