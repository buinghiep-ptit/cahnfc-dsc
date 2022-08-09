import { StoreCreator, ThemeSlice } from '../types'

/**
 * Create independent slice
 * @param set - Set new value
 * @param get - Get value from store
 */
export const createThemeSlice: StoreCreator<ThemeSlice> = set => ({
  isDarkMode: true,
  toggleTheme: (): void => {
    set(state => ({ isDarkMode: !state.isDarkMode }), false, 'toggleTheme')
  },
})
