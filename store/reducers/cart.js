import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
} from "../actions/type";
import { minValueOne } from "../../utils";

const init = {
  cart: [],
};

export const cartReducer = (state = init, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const productId = action.product.id;
      // If already in cart, do nothing
      if (state.cart.findIndex((product) => product.id === productId) !== -1) {
        return state;
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.product,
            selected_color: action.color,
            selected_size: action.size,
            qty: action.qty,
            sum:
              ((action.product.price * action.product.discount) / 100) *
              action.qty,
          },
        ],
      };
    }

    case REMOVE_FROM_CART:
      return {
        cart: state.cart.filter((item) => item.id !== action.product_id),
      };

    case INCREMENT_QUANTITY:
      const inc_productId = action.product_id.id;
      const new_cart = state.cart.reduce((cartAcc, product) => {
        if (product.id === inc_productId) {
          cartAcc.push({
            ...product,
            qty: product.qty + 1,
          });
        } else {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);
      return { ...state, cart: new_cart };

    case DECREMENT_QUANTITY:
      const decProductId = action.product_id.id;
      const decCart = state.cart.reduce((cartAcc, product) => {
        if (product.id === decProductId) {
          cartAcc.push({
            ...product,
            qty: minValueOne(product.qty - 1),
          });
        } else {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);

      return { ...state, cart: decCart };

    default:
      return state;
  }
};

export default cartReducer;
