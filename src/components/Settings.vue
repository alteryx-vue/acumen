<template>

	<div>
		<v-alert type="info" value="true" calss="mb-2">
	      For the demo, these inputs are unbound.  When using this app with your own Gallery, you'll need to provide these values.
	    </v-alert>

		<v-form>
			<v-card class="mb-3">
				<v-card-title class="pb-0">
					<div class="title blue-grey--text">Alteryx Gallery URL</div>
				</v-card-title>
				<v-card-text>
					<!-- <v-text-field label="Gallery URL" v-model="gallery"></v-text-field> -->
					<v-text-field label="Gallery URL" value="https://alteryxacumen.rocks/gallery"></v-text-field>
				</v-card-text>
			</v-card>

			<v-card class="mb-3">
				<v-card-title class="pb-0">
					<div class="title blue-grey--text">Private Studio API</div>
				</v-card-title>
				<v-card-text>
					<!-- <v-text-field label="Key" v-model="key"></v-text-field>
					<v-text-field label="Secret" v-model="secret"></v-text-field> -->
					<v-text-field label="Key"></v-text-field>
					<v-text-field label="Secret"></v-text-field>
				</v-card-text>
			</v-card>

			<v-card class="mb-3">
				<v-card-title class="pb-0">
					<div class="title blue-grey--text">Admin API</div>
				</v-card-title>
				<v-card-text>
					<p class="mt-0">Make sure this is enabled under <b>account > settings > keys</b></p>
					<!-- <v-text-field label="Key" v-model="adminKey"></v-text-field>
					<v-text-field label="Secret" v-model="adminSecret"></v-text-field> -->
					<v-text-field label="Key"></v-text-field>
					<v-text-field label="Secret"></v-text-field>
				</v-card-text>
			</v-card>

			<v-card>
				<v-card-title class="pb-0">
					<div class="title blue-grey--text">Alteryx Server MongoDB</div>
				</v-card-title>
				<v-card-text>
					<p class="mt-0">Download the Alteryx MongoDB API application and publish to your Alteryx Gallery</b></p>
					<!-- <v-text-field label="Alteryx Application ID" v-model="mongoApp"></v-text-field>
					<v-text-field label="MongoDB Server" v-model="mongoServer"></v-text-field>
					<v-text-field label="Port" v-model="mongoPort"></v-text-field>
					<v-text-field label="Gallery Database" v-model="mongoGallery"></v-text-field>
					<v-text-field label="Service Database" v-model="mongoService"></v-text-field>
					<v-text-field label="Username" v-model="mongoUser"></v-text-field>
					<v-text-field label="Password" v-model="mongoPass"></v-text-field> -->
					<v-text-field label="Alteryx Application ID">></v-text-field>
					<v-text-field label="MongoDB Server" value="localhost"></v-text-field>
					<v-text-field label="Port" value="27018"></v-text-field>
					<v-text-field label="Gallery Database" value="AlteryxGallery"></v-text-field>
					<v-text-field label="Service Database" value="AlteryxService"></v-text-field>
					<v-text-field label="Username" value="user"></v-text-field>
					<v-text-field label="Password"></v-text-field>
				</v-card-text>
			</v-card>

		</v-form>


	</div>

</template>

<script>
  export default {
    name: 'Settings',
    data () {
      return {
      }
    },
	computed: {
		gallery: {
			get () {
				return this.$store.state.gallery
			},
			set (value) {
				this.$store.commit('updateGallery', value)
			}
		},
		key: {
			get () {
				return this.$store.state.privateApi.key
			},
			set (value) {
				this.$store.commit('updateKey', value)
			}
		},
		secret: {
			get () {
				return this.$store.state.privateApi.secret
			},
			set (value) {
				this.$store.commit('updateSecret', value)
			}
		},
		adminKey: {
			get () {
				return this.$store.state.adminApi.key
			},
			set (value) {
				this.$store.commit('updateAdminKey', value)
			}
		},
		adminSecret: {
			get () {
				return this.$store.state.adminApi.secret
			},
			set (value) {
				this.$store.commit('updateAdminSecret', value)
			}
		},
		mongoApp: {
			get () {
				return this.$store.state.mongodb.app
			},
			set (value) {
				this.$store.commit('updateMongoApp', value)
			}
		},
		mongoServer: {
			get () {
				return this.$store.state.mongodb.server
			},
			set (value) {
				this.$store.commit('updateMongoServer', value)
			}
		},
		mongoPort: {
			get () {
				return this.$store.state.mongodb.port
			},
			set (value) {
				this.$store.commit('updateMongoPort', value)
			}
		},
		mongoGallery: {
			get () {
				return this.$store.state.mongodb.gallerydb
			},
			set (value) {
				this.$store.commit('updateMongoGallery', value)
			}
		},
		mongoService: {
			get () {
				return this.$store.state.mongodb.servicedb
			},
			set (value) {
				this.$store.commit('updateMongoService', value)
			}
		},
		mongoUser: {
			get () {
				return this.$store.state.mongodb.user
			},
			set (value) {
				this.$store.commit('updateMongoUser', value)
			}
		},
		mongoPass: {
			get () {
				return this.$store.state.mongodb.pass
			},
			set (value) {
				this.$store.commit('updateMongoPass', value)
			}
		},
	}
  }
</script>