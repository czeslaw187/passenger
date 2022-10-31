import '../styles/globals.css'
import { wrapper } from '../lib/store'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
