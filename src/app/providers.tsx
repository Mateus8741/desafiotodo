'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Desabilita refetch no foco da janela
            refetchOnWindowFocus: false,
            // Desabilita refetch na reconexão
            refetchOnReconnect: false,
            // Desabilita retry em caso de erro
            retry: false,
            // Importante: isso garante que o estado inicial seja consistente
            staleTime: Infinity,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
} 