<template>

  <div>

    <v-navigation-drawer fixed permanent app width="240">

      <v-toolbar class="light-blue darken-3">
        <v-list>
          <v-list-tile>
            <img src="public/alteryx-banner.png" height="48">
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <!-- <v-divider></v-divider> -->

      <v-list class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" :to="item.route">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="item.count > 0">
            <span class="blue--text text--darken-1">{{ item.action }}</span>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <v-toolbar fixed app class="light-blue darken-3 white--text">
      <v-toolbar-title>
        {{ title }}
        <v-icon dark>chevron_right</v-icon>
        {{ page }}
      </v-toolbar-title>
    </v-toolbar>

  </div>

</template>

<script>
  export default {
    name: 'Navigation',
    data () {
      return {
        title: this.$store.state.title,
        excerpt: this.$store.state.excerpt
      }
    },
    computed: {
      page () {
        return this.$route.name
      },
      items() {
        return [
          { 
            title: 'Overview', 
            route: '/', 
            icon: 'dashboard', 
            count: 0,
            action: null
          },
          { 
            title: 'Users', 
            route: '/users', 
            icon: 'supervisor_account', 
            count: this.$store.state.users.data.length,
            action: this.$store.state.users.data.length
          },
          { 
            title: 'Sessions', 
            route: '/sessions', 
            icon: 'visibility', 
            count: this.$store.state.sessions.data.filter((s) => this.$moment(s.LastActive).isSameOrAfter(this.$moment().startOf('day'))).length,
            action: this.$store.state.sessions.data.filter((s) => this.$moment(s.LastActive).isSameOrAfter(this.$moment().startOf('day'))).length
          },
          {
            title: 'Jobs', 
            route: '/jobs', 
            icon: 'schedule', 
            count: parseInt(this.$store.state.jobs.total),
            action: this.$store.state.jobs.data.filter((m) => m.GalleryAppID !== this.$store.state.mongodb.app && m.Status == 'Running').length.toString() + '/' + this.$store.state.jobs.total
          },          
          { 
            title: 'Content', 
            route: '/content', 
            icon: 'get_app', 
            count: 0,
            action: null
          },
          { 
            title: 'Settings', 
            route: '/settings', 
            icon: 'settings', 
            count: 0,
            action: null
          }
        ]
      },
    }    
  }
</script>