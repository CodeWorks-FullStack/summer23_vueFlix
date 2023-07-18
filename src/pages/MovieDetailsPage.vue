<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-4">
        <h1>Movie Details</h1>
      </div>
    </div>
    <div v-if="movie" class="row">
      <div class="col-6">
        <h2>{{ movie?.title }}</h2>
        <h3>Budget: {{ movie.budget }}</h3>
        <p>{{ movie.overview }}</p>
      </div>
      <div class="col-6">
        <img class="img-fluid" :src="movie.backdrop" alt="movie backdrop">
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { moviesService } from '../services/MoviesService.js';
import { AppState } from '../AppState.js';

export default {
  setup() {

    const route = useRoute()

    async function getMovieById() {
      try {
        const movieId = route.params.movieId
        logger.log('Here is the route parameter id', movieId)
        await moviesService.getMovieById(movieId)
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => {
      getMovieById()
    })
    return {
      movie: computed(() => AppState.activeMovie)
    }
  }
}
</script>


<style lang="scss" scoped></style>