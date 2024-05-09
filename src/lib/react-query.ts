import { QueryClient, DefaultOptions } from '@tanstack/react-query';

import { defaultQueryFn } from '@/api/cardApi';

const queryConfig: DefaultOptions = {
  queries: {
    queryFn: defaultQueryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
