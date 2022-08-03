import { EmptyLayout } from '@/layouts'
import { AppPropsWithLayout } from '@/models/common'
import { createEmotionCache, theme } from '@/utils'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '../styles/globals.css'
import { Provider, useCreateStore } from '@/store'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
interface AppProps extends AppPropsWithLayout {
  emotionCache?: EmotionCache
}

function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps) {
  const createStore = useCreateStore(pageProps.initialZustandState)
  console.log('store:', createStore().getState())

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
          },
        },
      }),
  )
  const Layout = Component.Layout ?? EmptyLayout
  return (
    <Provider createStore={createStore}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </CacheProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
