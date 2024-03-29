import { ICartProduct } from 'interfaces';
import { IShippingAddress } from 'interfaces/order';
import { ICartState } from './';

type ICartType =
  | {
      type: '[Cart] - LoadCart from cookies | storage';
      payload: ICartProduct[];
    }
  | {
      type: '[Cart] - Update products in cart';
      payload: ICartProduct[];
    }
  | {
      type: '[Cart] - Change cart quantity';
      payload: ICartProduct;
    }
  | {
      type: '[Cart] - Remove product in cart';
      payload: ICartProduct;
    }
  | {
      type: '[Cart] - Update order summary';
      payload: {
        numberOfItems: number;
        total: number;
      };
    }
  | {
      type: '[Cart] - Load address from cookies';
      payload: IShippingAddress;
    }
  | {
      type: '[Cart] - Update address';
      payload: IShippingAddress;
    }
  | {
      type: '[Cart] - Order complete';
    };

export const cartReducer = (
  state: ICartState,
  action: ICartType
): ICartState => {
  switch (action.type) {
    case '[Cart] - LoadCart from cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case '[Cart] - Update products in cart':
      return {
        ...state,
        cart: [...action.payload],
      };

    case '[Cart] - Change cart quantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.id !== action.payload.id) return product;

          // if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };

    case '[Cart] - Remove product in cart':
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              (product.id === action.payload.id)
              // product.size === action.payload.size
            )
        ),
      };
    case '[Cart] - Update order summary':
      return {
        ...state,
        ...action.payload,
      };
    case '[Cart] - Update address':
    case '[Cart] - Load address from cookies':
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case '[Cart] - Order complete':
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        total: 0,
      };

    default:
      return state;
  }
};
