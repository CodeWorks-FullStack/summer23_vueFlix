<template>
  <h2 class="mb-3">Page {{ page }} of {{ totalPages }}</h2>
  <div class="d-flex justify-content-between">

    <button :disabled="page <= 1" class="btn btn-primary" @click="getNewPageOfMovies(page - 1)">Previous
      Page</button>
    <button :disabled="page == totalPages" class="btn btn-primary" @click="getNewPageOfMovies(page + 1)">Next
      Page</button>
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { moviesService } from '../services/MoviesService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    return {
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),
      async getNewPageOfMovies(pageNumber) {
        try {
          const query = AppState.query

          if (!query) {
            await moviesService.getNewPageOfMovies(pageNumber);
          }

          else {
            await moviesService.getMoviesByQueryWithPageNumber(query, pageNumber)
          }


        }
        catch (error) {
          Pop.error(error);
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>