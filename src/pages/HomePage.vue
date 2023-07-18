<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-4">
        <h1>Movies</h1>
        <!-- STUB abstarcted out to the PageNavigation component -->
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
        <!-- NOTE passing down a prop here. Props are how we pass down data from a parent component to a child component -->
        <!-- NOTE movieProp is the name of the prop that is set up in our MovieCard component, movie comes from our v-for and is passed down as the value of the prop -->
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
    // SECTION private

    async function getMovies() {
      try {
        await moviesService.getMovies();
      }
      catch (error) {
        Pop.error(error, "[GETTING MOVIES]");
      }
    }

    // NOTE lifecycle hook. The code inside of the function we pass to onMounted will run as soon as the HomePage is mounted in Vue. Think of this as the constructor inside of controller class
    onMounted(() => {
      logger.log("Home Page mounted");
      getMovies();
    });

    // NOTE runs when the HomePage is no longer mounted in Vue
    onUnmounted(() => {
      logger.log("Home Page unmounted");
    });

    return {
      // SECTION public

      movies: computed(() => AppState.movies),

      // NOTE abstraced out to the PageNavigation component
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
