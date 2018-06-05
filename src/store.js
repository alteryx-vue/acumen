import Vue from 'vue'
import Vuex from 'vuex'
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
			key: '8D5CA4186F7D45406098ee5d79662da2ae5b320f7764ac7c8f406d2',
			secret: '5ff316007b5c2edfbcfd805baf06e983c2be4b29f5b3b881b52e9b3f317206cd'
		},
		adminApi: {
			key: '8D5CA4190E799D6346540186089b08f6d9853c8f78e5136ac9b2d17',
			secret: 'f31b102bf35ca5894c2caee6ed1c71a55461da3d5d7f1c5291b22808c0c54df1'
		},
		mongodb: {
			app: '5b1582c443e7ff0ba45d4d41',
			server: 'localhost',
			port: '27018',
			gallerydb: 'AlteryxGallery',
			servicedb: 'AlteryxService',
			user: 'user',
			pass: '01E75E8157EFA4B0FA3BF3A163C2AA322B3187FC'
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