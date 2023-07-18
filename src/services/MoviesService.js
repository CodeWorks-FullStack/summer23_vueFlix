import { AppState } from "../AppState.js"
import { Movie } from "../models/Movie.js"
import { logger } from "../utils/Logger.js"
import { movieApi } from "./AxiosService.js"

class MoviesService {
  async getMovies() {
    const res = await movieApi.get('discover/movie')
    logger.log('got movies', res.data)
    const movies = res.data.results.map(moviePojo => new Movie(moviePojo))

    AppState.movies = movies

    AppState.page = res.data.page

    AppState.totalPages = res.data.total_pages
  }

  async getNextPageOfMovies() {
    const res = await movieApi.get(`discover/movie/?page=${AppState.page + 1}`)
    logger.log('[got next page of movies]', res.data)
    const movies = res.data.results.map(moviePojo => new Movie(moviePojo))

    AppState.movies = movies

    AppState.page = res.data.page

    AppState.totalPages = res.data.total_pages
  }
  async getPreviousPageOfMovies() {
    const res = await movieApi.get(`discover/movie/?page=${AppState.page - 1}`)
    logger.log('[got next page of movies]', res.data)
    const movies = res.data.results.map(moviePojo => new Movie(moviePojo))

    AppState.movies = movies

    AppState.page = res.data.page

    AppState.totalPages = res.data.total_pages
  }

  async getNewPageOfMovies(pageNumber) {
    const res = await movieApi.get(`discover/movie/?page=${pageNumber}`)
    logger.log('[got next page of movies]', res.data)

    const movies = res.data.results.map(moviePojo => new Movie(moviePojo))

    AppState.movies = movies

    AppState.page = res.data.page

    AppState.totalPages = res.data.total_pages
  }

  async getMovieById(movieId) {
    const res = await movieApi.get(`movie/${movieId}`)
    logger.log('got movie by id', res.data)

    const movie = new Movie(res.data)

    AppState.activeMovie = movie
  }

  async getMoviesByQuery(queryObject) {
    const res = await movieApi.get(`search/movie?query=${queryObject.query}`)
    logger.log('got movies with query', res.data)
    const movies = res.data.results.map(moviePojo => new Movie(moviePojo))

    AppState.movies = movies

    AppState.page = res.data.page

    AppState.totalPages = res.data.total_pages

    AppState.query = queryObject
  }

  async getMoviesByQueryWithPageNumber(queryObject, pageNumber) {
    const res = await movieApi.get(`search/movie?query=${queryObject.query}&page=${pageNumber}`)
    logger.log('got movies with query', res.data)
    const movies = res.data.results.map(moviePojo => new Movie(moviePojo))

    AppState.movies = movies

    AppState.page = res.data.page

    AppState.totalPages = res.data.total_pages

    AppState.query = queryObject

  }

  clearMovies() {
    AppState.movies = []
    AppState.page = 0
    AppState.totalPages = 0
    AppState.query = null
  }
}

export const moviesService = new MoviesService()