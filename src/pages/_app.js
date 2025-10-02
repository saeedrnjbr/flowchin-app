import "@/styles/globals.css";
import { store } from "../store"
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import NProgress from 'nprogress'
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }
    handleStop()
    return () => {
      handleStart()
    }
  }, [pathname, searchParams])


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
