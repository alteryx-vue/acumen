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
			key: '8D5CB23A1D6B48B867201ecde27d3047fbc48856278688529d8259a',
			secret: '9ea66c6da346d3adac96f88deb52e43b648e3ddee2677f39cb29c5ee6d3e7157='
		},
		adminApi: {
			key: '8D5CB23CC02BA8F0313c16b2b8ab39cc48488340e16caa30d629c92',
			secret: '3766664f31feb2496dae8bf8cd6bbfbde48850f3891e70b0b64c716f2e8149bc'
		},
		mongodb: {
			app: '5b172c6043e7ff08cc369bb4',
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