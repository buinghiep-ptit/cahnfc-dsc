import { LanguageSlice, StoreCreator } from '../types'

/**
 * Create independent slice
 * @param set - Set new value
 * @param get - Get value from store
 */
export const createLanguageSlice: StoreCreator<LanguageSlice> = set => ({
  isEnglish: false,
  toggleLanguage: (): void => {
    set(state => ({ isEnglish: !state.isEnglish }), false, 'toggleLanguage')
  },
})
