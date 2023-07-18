<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-4">
        <h1>Movies</h1>
        <!-- <h2>Page 0 of 100</h2> -->
        <!-- <h2 class="mb-3">Page {{ page }} of {{ totalPages }}</h2>
        <div class="d-flex justify-content-between">


          <button :disabled="page == 1" class="btn btn-primary" @click="getNewPageOfMovies(page - 1)">Previous
            Page</button>
          <button :disabled="page == totalPages" class="btn btn-primary" @click="getNewPageOfMovies(page + 1)">Next
            Page</button>
        </div> -->
        <PageNavigation />
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-12">
        NOTE good first step to see if data is brought in correctly
        {{ movies }}
        
        NOTE good second step
        <h2 v-for="movie in movies" :key="movie.id">
          {{ movie.title }}
        </h2>
      </div> -->

      <div v-for="movie in movies" :key="movie.id" class="col-md-3 p-4">
        <MovieCard :movieProp="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { moviesService } from '../services/MoviesService.js'
import { AppState } from '../AppState.js';
import MovieCard from '../components/MovieCard.vue';
import PageNavigation from '../components/PageNavigation.vue';


export default {
  setup() {
    async function getMovies() {
      try {
        await moviesService.getMovies();
      }
      catch (error) {
        Pop.error(error, "[GETTING MOVIES]");
      }
    }
    onMounted(() => {
      logger.log("Home Page mounted");
      getMovies();
    });
    onUnmounted(() => {
      logger.log("Home Page unmounted");
    });
    return {
      movies: computed(() => AppState.movies),
      // page: computed(() => AppState.page),
      // totalPages: computed(() => AppState.totalPages),
      // NOTE worked, but refactored into getNewPageOfMovies
      // async getNextPageOfMovies() {
      //   try {
      //     await moviesService.getNextPageOfMovies();
      //   }
      //   catch (error) {
      //     Pop.error(error);
      //   }
      // },
      // async getNewPageOfMovies(pageNumber) {
      //   try {
      //     await moviesService.getNewPageOfMovies(pageNumber);
      //   }
      //   catch (error) {
      //     Pop.error(error);
      //   }
      // }
    };
  },
  components: { MovieCard, PageNavigation }
}
</script>

<style scoped lang="scss"></style>
