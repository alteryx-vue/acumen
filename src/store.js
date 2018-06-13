import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: state => ({
    	gallery: state.gallery,
    	authType: state.authType,
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
		authType: 'integrated',
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
			data: [],
			total: '0',
			hourly: []
		},
		jobResult: {
			errors: null,
			log: null
		},
		package: null,
		searchResults: null,
		searching: false
	},
	mutations: {
		updateGallery (state, v) {
			state.gallery = v
		},
		updateAuthType (state, v) {
			state.authType = v
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
			state.jobResult.log = v[0].OutputLog
		},
		updateRefreshRate (state, v) {
			state.jobs.refreshrate = v
		},
		updateJobTotal(state, v) {
			state.jobs.total = v
		},
		updateHourlyJobs(state, v){
			state.jobs.hourly = v
		},
		updatePackage(state, v) {
			state.package = v[0]
		},
		clearPackage(state) {
			state.package = null
		},
		updateSearchResults(state, v) {
			state.searchResults = v
		},
		clearSearchResults(state) {
			state.searchResults = null
		},
		updateSearching(state, v) {
			state.searching = v
		}
	},
	plugins: [vuexLocal.plugin]
})