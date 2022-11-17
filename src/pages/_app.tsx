import { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  // MEMO: client - server 間でのやり取りをする上で必要な初期設定
  axios.defaults.withCredentials = true;
  // MEMO: 初期レンダリングでCSRFトークンを取得する
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      );
      axios.defaults.headers.common['csrf-token'] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          fontFamily: 'Verdana, sans-serif',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
