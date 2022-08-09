import { StateCreator } from 'zustand'

/**
 * Independent slices
 */
export interface ThemeSlice {
  isDarkMode: boolean
  toggleTheme: () => void
}

export interface LanguageSlice {
  isEnglish: boolean
  toggleLanguage: () => void
}

export interface CartSlice {
  quantity: number
  increment: () => void
  decrement: () => void
}

/**
 * Main Store
 * @see https://github.com/pmndrs/zustand/blob/main/docs/typescript.md#independent-slices-pattern
 */
export type Store = ThemeSlice & LanguageSlice & CartSlice

/**
 * Set & Get for independent slices
 */
export type StoreCreator<T> = StateCreator<
  Store,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  T
>
