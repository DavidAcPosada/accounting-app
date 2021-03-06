import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import Head from 'next/head'

import store from '../redux/store'

import theme from './../utils/theme'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <Provider store={store}>
      <Head>
        <title>Contabilidad</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
