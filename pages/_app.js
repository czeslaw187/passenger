import '../styles/globals.css'
import { wrapper } from '../lib/store'
import Layout from '../components/Layout'
import {persistor, store} from '../lib/store'
import { PersistGate } from 'redux-persist/integration/react';
import withRedux from 'next-redux-wrapper'
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
    </Layout>
  )
}

const makeStore = () => store
export default withRedux(makeStore)(MyApp)

