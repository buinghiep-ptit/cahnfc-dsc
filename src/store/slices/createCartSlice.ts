import { CartSlice, StoreCreator } from '../types'

/**
 * Create independent slice
 * @param set - Set new value
 * @param get - Get value from store
 */
export const createCartSlice: StoreCreator<CartSlice> = set => ({
  quantity: 10,
  increment: () => {
    set(
      state => ({ quantity: state.quantity + 1 }),
      false,
      'quantity/increment',
    )
  },
  decrement: () => {
    set(
      state => ({ quantity: state.quantity - 1 }),
      false,
      'quantity/decrement',
    )
  },
})
