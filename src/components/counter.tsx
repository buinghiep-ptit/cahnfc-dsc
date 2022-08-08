import { useStore } from '@/store'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
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
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])
  return (
    <Box>
      <Typography variant="h3">Count: {count}</Typography>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </Box>
  )
}

export default Counter
