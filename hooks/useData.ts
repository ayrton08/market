import { IProduct } from 'interfaces';
import { fetchApi } from 'lib/api';
import useSWR from 'swr';
import useSWRInmutable from 'swr/immutable';

export const useData = (path: string) => {
  const { data, error } = useSWR(path, fetchApi);
  return data;
};

export const useProducts = () => {
  const { data, error } = useSWRInmutable('/products', fetchApi);
  return data;
};

export const useProduct = (id: string) => {
  const { data, error } = useSWRInmutable('/products/' + id, fetchApi);
  return data?.product;
};

export const useGetProductBySearch = (
  query: string,
  offset?: number,
  limit?: number
) => {
  const path = `/products?search=${query}&offset=${offset || 0}&limit=${
    limit || 12
  }`;
  const { data, error } = useSWR(path, fetchApi);

  if (error?.status) return false;
  return data;
};
