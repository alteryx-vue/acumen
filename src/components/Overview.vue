<template>

	<v-jumbotron
	    gradient="to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)"
	    src="/public/material2.jpg"
	    dark
	  >
	    <v-container fill-height>
	      <v-layout align-center>
	        <v-flex>
	          <h3 class="display-3">Alteryx Acumen</h3>
	          <span class="subheading">Alteryx Acumen is a server admin tool that provides insights about Gallery users, jobs, content &amp; more</span>
	          <v-divider class="my-3"></v-divider>
	          <div class="title mb-3">This demo is connected to a public gallery running in Google Cloud</div>
	          <v-btn large color="primary" class="mx-0" to="/sessions">See more</v-btn>
	        </v-flex>
	      </v-layout>
	    </v-container>
	  </v-jumbotron>

</template>

<script>
  export default {
    name: 'Overview',
    data () {
      return {
      }
    }
  }
</script>