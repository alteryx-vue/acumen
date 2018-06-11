import Vue from 'vue'
import Vuex from 'vuex'

/*

NOTE:
In your own envirnoment, you may want to uncomment and enable vuex-persist
to allow your browser to remember your application settings.  
There 2 areas to uncomment - the first is the block directly below this
and the second is at the very bottom of the store where it reads "plugins: [vuexLocal.plugin]"

*/

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: state => ({
    	gallery: state.gallery,
    	privateApi: state.privateApi,
		adminApi: state.adminApi,
		mongodb: state.mongodb
    })
})

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		title: 'Alteryx Acumen',
		excerpt: 'keen insights for alteryx admins',
		gallery: 'https://alteryxacumen.rocks/gallery',
		privateApi: {
			key: '',
			secret: ''
		},
		adminApi: {
			key: '',
			secret: ''
		},
		mongodb: {
			app: '',
			server: 'localhost',
			port: '27018',
			gallerydb: 'AlteryxGallery',
			servicedb: 'AlteryxService',
			user: 'user',
			pass: ''
		},
		apiError: null,
		loading: false,
		status: null,
		questions: [],
		job: null,
		sessions: {
			loading: false,
			data: []
		},
		users: {
			loading: false,
			data: []
		},
		jobs: {
			loading: false,
			refreshrate: '0',
			data: []
		},
		jobResult: {
			errors: null,
			log: null
		}
	},
	mutations: {
		updateGallery (state, v) {
			state.gallery = v
		},
		updateKey (state, v) {
			state.privateApi.key = v
		},
		updateSecret (state, v) {
			state.privateApi.secret = v
		},
		updateAdminKey (state, v) {
			state.adminApi.key = v
		},
		updateAdminSecret (state, v) {
			state.adminApi.secret = v
		},
		updateMongoApp (state, v) {
			state.mongodb.app = v
		},
		updateMongoServer (state, v) {
			state.mongodb.server = v
		},
		updateMongoPort (state, v) {
			state.mongodb.port = v
		},
		updateMongoGallery (state, v) {
			state.mongodb.gallerydb = v
		},
		updateMongoService (state, v) {
			state.mongodb.servicedb = v
		},
		updateMongoUser (state, v) {
			state.mongodb.user = v
		},
		updateMongoPass (state, v) {
			state.mongodb.pass = v
		},
		updateApiError (state, v) {
			state.apiError = v
		},
		updateQuestions (state, v) {
			state.questions = v
		},
		updateJobs (state, v) {
			state.jobs = v
		},
		updateJob (state, v) {
			state.job = v
		},
		updateSessions (state, v) {
			state.sessions.data = v
		},
		updateSessionsLoading (state, v) {
			state.sessions.loading = v
		},
		updateUsers (state, v) {
			state.users.data = v
		},
		updateUsersLoading (state, v) {
			state.users.loading = v
		},
		updateJobs (state, v) {
			state.jobs.data = v
		},
		updateJobsLoading (state, v) {
			state.jobs.loading = v
		},
		updateResult (state, v) {
			// state.jobResult.errors = v.ErrorMessage.split('__lineBreak__')
			state.jobResult.log = v[0].OutputLog
		},
		updateRefreshRate (state, v) {
			state.jobs.refreshrate = v
		}
	},
	plugins: [vuexLocal.plugin]
})