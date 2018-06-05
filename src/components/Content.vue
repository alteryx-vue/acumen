<template>
	
	<v-jumbotron
		gradient="to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)"
	    src="/public/working.gif"
	    dark
	  >
	    <v-container fill-height>
	      <v-layout align-center>
	        <v-flex>
	          <div class="display-1">Working on it..</div>
	          <v-divider class="my-3"></v-divider>
	          <v-btn large class="mx-0" to="/jobs">View jobs instead</v-btn>
	        </v-flex>
	      </v-layout>
	    </v-container>
	  </v-jumbotron>

</template>

<script>
  export default {
    name: 'Content',
    data () {
      return {
      }
    }
  }
</script>