<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-4">
        <h1>Search</h1>
        <form @submit.prevent="getMoviesByQuery()">
          <label for="searchBar">Search Movies</label>
          <!-- NOTE v-model sets up two-way data-binding between this input and our editable object defined in setup -->
          <input v-model="editable.query" id="searchBar" type="text" required minlength="2" class="w-50">
          <button class="btn btn-info" type="submit">
            <i class="mdi mdi-magnify"></i>
          </button>
        </form>
      </div>
      <div class="col-12">
        <!-- NOTE reuseable components! -->
        <PageNavigation />
      </div>
    </div>
    <div class="row">

      <div v-for="movie in movies" :key="movie.id" class="col-md-2">
        <!-- NOTE reuseable components! -->
        <MovieCard :movieProp="movie" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { moviesService } from '../services/MoviesService.js';
import { AppState } from '../AppState.js'
import MovieCard from '../components/MovieCard.vue';
import PageNavigation from '../components/PageNavigation.vue';


export default {
  setup() {
    // NOTE creates a reactive object that we bind to our input field above
    const editable = ref({});

    onMounted(() => {
      moviesService.clearMovies()
    })

    onUnmounted(() => {
      moviesService.clearMovies()
    })

    return {
      editable,
      movies: computed(() => AppState.movies),
      async getMoviesByQuery() {
        try {
          logger.log(editable.value);
          // NOTE editable is a wrapper around our object used to instantiate our ref, we care about the value stored inside of it
          const queryObject = editable.value;
          await moviesService.getMoviesByQuery(queryObject);
        }
        catch (error) {
          Pop.error(error);
        }
      }
    };
  },
  components: { MovieCard, PageNavigation }
}
</script>


<style lang="scss" scoped>
label {
  display: block;
}
</style>