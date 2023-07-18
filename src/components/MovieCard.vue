<template>
  <router-link :to="{ name: 'Movie', params: { movieId: movieProp.id } }">
    <img :src="movieProp.poster" :alt="movieProp.title" class="img-fluid">
    <h3 class="text-dark">{{ movieProp.title }}</h3>
  </router-link>
</template>


<script>
import { Movie } from '../models/Movie.js';



export default {
  props: {
    movieProp: { type: Movie, required: true }
  },
  setup() {
    return {
      // REVIEW BAD
      // movies: computed(() => AppState.movies)
    }
  }
}
</script>


<style lang="scss" scoped></style>