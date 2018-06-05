<template>
  <v-app>
    
    <navigation app></navigation>

    <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
    </v-content>
    
  </v-app>
</template>

<script>

import Navigation from './components/Navigation.vue';

  export default {
    components: {
      Navigation
    },
    data () {
      return {
      }
    }
  }
</script>
