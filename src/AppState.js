import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Movie.js').Movie[]} */
  movies: [],
  /** @type {import('./models/Movie.js').Movie | null} */
  activeMovie: null,
  page: 0,
  totalPages: 0,
  query: null
})
