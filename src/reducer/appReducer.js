export const initialState = {
  theme: 'dark',
  favorites: [],
  user: { name: 'Guest', role: 'Student', id: 'S001' },
}

export function appReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }

    case 'ADD_FAVORITE':
      if (state.favorites.find((f) => f.id === action.payload.id)) return state
      return { ...state, favorites: [...state.favorites, action.payload] }

    case 'REMOVE_FAVORITE':
      return { ...state, favorites: state.favorites.filter((f) => f.id !== action.payload) }

    case 'CLEAR_FAVORITES':
      return { ...state, favorites: [] }

    case 'SET_USER':
      return { ...state, user: { ...state.user, ...action.payload } }

    default:
      return state
  }
}
