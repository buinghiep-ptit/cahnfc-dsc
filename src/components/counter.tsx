import { useStore } from '@/store'
import { Store } from '@/store/types'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
const useCounter = () => {
  const {
    isEnglish,
    toggleLanguage,
    isDarkMode,
    toggleTheme,
    quantity,
    increment,
    decrement,
    reset,
  } = useStore(
    (store: Store | any) => ({
      isEnglish: store.isEnglish,
      toggleLanguage: store.toggleLanguage,
      isDarkMode: store.isDarkMode,
      toggleTheme: store.toggleTheme,
      quantity: store.quantity,
      increment: store.increment,
      decrement: store.decrement,
      reset: store.reset,
    }),
    shallow,
  )

  return {
    isEnglish,
    toggleLanguage,
    isDarkMode,
    toggleTheme,
    quantity,
    increment,
    decrement,
    reset,
  }
}

const Counter = () => {
  const {
    isEnglish,
    toggleLanguage,
    isDarkMode,
    toggleTheme,
    quantity,
    increment,
    decrement,
    reset,
  } = useCounter()
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])
  return (
    <Box>
      <Typography variant="h3">DarkMode: {isEnglish ? 'EN' : 'VI'}</Typography>
      <button onClick={toggleLanguage}>toggleLanguage</button>
      <Typography variant="h3">
        DarkMode: {isDarkMode ? 'Dark' : 'Light'}
      </Typography>
      <button onClick={toggleTheme}>ToggleTheme</button>
      <Typography variant="h3">Quantity: {quantity}</Typography>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </Box>
  )
}

export default Counter
