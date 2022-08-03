import { useStore } from '@/store'
import shallow from 'zustand/shallow'
const useCounter = () => {
  const { count, increment, decrement, reset } = useStore(
    (store: any) => ({
      count: store.count,
      increment: store.increment,
      decrement: store.decrement,
      reset: store.reset,
    }),
    shallow,
  )

  return { count, increment, decrement, reset }
}

const Counter = () => {
  const { count, increment, decrement, reset } = useCounter()
  console.log('useCounter:', useCounter())
  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      {/* <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button> */}
    </div>
  )
}

export default Counter
