export class Movie {
  constructor(data) {
    this.id = data.id
    this.originalLanguage = data.original_language
    this.title = data.title
    this.originalTitle = data.original_title
    this.overview = data.overview
    this.popularity = data.popularity
    this.releaseDate = data.release_date
    this.poster = `https://image.tmdb.org/t/p/original${data.poster_path}`
    this.backdrop = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    this.budget = data.budget || 0
  }
}

// REVIEW this could work
// export class DetailedMovie extends Movie{
  
// }