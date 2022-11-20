import { Suspense } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider, Loader } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
      // useErrorBoundary: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
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
        <ErrorBoundary fallback={<h3>Error...</h3>}>
          <Suspense fallback={<Loader my="lg" color="cyan" />}>
            <Component {...pageProps} />
          </Suspense>
        </ErrorBoundary>
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
