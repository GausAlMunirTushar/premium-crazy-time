import { SWRConfig } from '@/types/configs'
import { useQuery } from '@/hooks/useQuery'
import { useCallback, useState } from 'react'

interface PaginatedResponse<T> {
  data: T[];             // Paginated data array
  current_page: number;  // Current page
  last_page: number;     // Last page
  // ... plus anything else your server returns
}

// Example: You might want to parameterize the shape of data, e.g. T
export function usePaginatedQuery<T>(
  urlOrConfig: string,
  initialPage = 1,
  initialPerPage = 10,
  swrConfig?: SWRConfig
) {
  // Track pagination in state
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);

  // Build the final URL, appending page & per_page
  const paginatedUrl = `${urlOrConfig}?page=${page}&per_page=${perPage}`;

  // Use your existing custom hook to fetch data
  const {
    data,
    error,
    isLoading,
    mutate,
    // any other fields you expose from useQuery
  } = useQuery<PaginatedResponse<T>>(paginatedUrl, swrConfig);

  // If the structure of the paginated response is known,
  // we can pull out `data`, `current_page`, `last_page`, etc.
  const paginatedData = data?.data || [];
  const currentPage = data?.current_page || 1;
  const lastPage = data?.last_page || 1;

  // Helper callbacks to navigate pages
  const nextPage = useCallback(() => {
    if (currentPage < lastPage) setPage((p) => p + 1);
  }, [currentPage, lastPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) setPage((p) => p - 1);
  }, [currentPage]);

  const goToPage = useCallback((pageNum: number) => {
    if (pageNum >= 1 && pageNum <= lastPage) {
      setPage(pageNum);
    }
  }, [lastPage]);

  // Possibly also a helper to change "perPage"
  const setPageSize = useCallback((newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1); // reset to page 1 whenever we change the per-page
  }, []);

  return {
    data: paginatedData,
    isLoading,
    error,
    currentPage,
    lastPage,
    setPage,
    setPageSize,
    nextPage,
    prevPage,
    goToPage,
    mutate,
  };
}
