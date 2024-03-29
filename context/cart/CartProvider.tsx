import { ICartProduct } from 'interfaces';
import { FC, useReducer, useEffect } from 'react';
import { CartContext, cartReducer } from './';
import cookie from 'js-cookie';
import { IOrder, IShippingAddress } from 'interfaces/order';
import cookies from 'js-cookie';
import fetchApi from '../../fetcher/fetchApi';
import axios from 'axios';

export interface ICartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  total: number;
  shippingAddress?: IShippingAddress;
}

const CART_INITIAL_STATE: ICartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  total: 0,
  shippingAddress: undefined,
};

export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = cookie.get('cart')
        ? JSON.parse(cookie.get('cart')!)
        : [];
      dispatch({
        type: '[Cart] - LoadCart from cookies | storage',
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: '[Cart] - LoadCart from cookies | storage',
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) {
      cookie.set('cart', JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );

    const total = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );

    const ordenSummary = {
      numberOfItems,
      total,
    };

    dispatch({ type: '[Cart] - Update order summary', payload: ordenSummary });
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p.id === product.id);

    if (!productInCart) {
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      });
    }

    const updatedProducts = state.cart.map((p) => {
      if (p.id !== product.id) return p;

      p.quantity += product.quantity;

      return p;
    });

    dispatch({
      type: '[Cart] - Update products in cart',
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Change cart quantity', payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product });
  };

  const updateAddress = (address: IShippingAddress) => {
    cookies.set('firstName', address.firstName);
    cookies.set('lastName', address.lastName);
    cookies.set('address', address.address);
    cookies.set('address2', address.address2 || '');
    cookies.set('zip', address.zip);
    cookies.set('city', address.city);
    cookies.set('country', address.country);
    cookies.set('phone', address.phone);

    dispatch({ type: '[Cart] - Update address', payload: address });
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingAddress) {
      throw new Error('There is no delivery address');
    }

    const body: IOrder = {
      orderItems: state.cart.map((order) => ({
        ...order,
        id: order.id,
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      total: state.total,
      isPaid: false,
    };

    try {
      const { data } = await fetchApi.post<IOrder>('/orders', body);

      dispatch({ type: '[Cart] - Order complete' });

      return {
        hasError: false,
        message: data.id!,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: 'Error no controlado, hable con el administrador',
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
