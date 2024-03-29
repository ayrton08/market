import { sortByDate } from 'helpers/sortByDate';
import { OrderCart } from 'interfaces/cart';
import { fetchApi } from 'lib/api';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export const useOrders = () => {
  const { data, error } = useSWR('/me/orders', fetchApi);
  const orders = data?.orders;
  // const [orders, setOrders] = useState<[] | null>();

  // const pendigOrders = allOrders?.filter(
  //   (order: OrderCart) => order.status === 'pending'
  // );
  // const closedOrders = allOrders?.filter(
  //   (order: OrderCart) => order.status === 'closed'
  // );

  // useEffect(() => {
  //   if (selected === 'Chose') {
  //     setOrders(null);
  //   }
  //   if (selected === 'Pending') {
  //     setOrders(pendigOrders);
  //   }
  //   if (selected === 'Payeds') {
  //     setOrders(closedOrders);
  //   }
  //   if (selected === 'All') {
  //     setOrders(allOrders);
  //   }
  // }, [allOrders, closedOrders, pendigOrders, selected]);

  return { orders: sortByDate(orders) };
};
