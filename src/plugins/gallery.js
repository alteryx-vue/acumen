import oauthsimple from 'oauthsimple'
import {store} from '../store.js'
import axios from 'axios'

const gallery = {

	install(Vue, options) {

		this.getSignedUrl = (method, endpoint) => {

				var api = endpoint.includes('/admin/') ? store.state.adminApi : store.state.privateApi,
				key = api.key,
				secret = api.secret,
				nonce = Math.floor(Math.random() * 1e9).toString(),
	            ts = Math.floor(new Date().getTime()/1000).toString(),
				oauth = new oauthsimple(),
				config = {
					path: endpoint,
					parameters: 'oauth_nonce='+nonce+'&oauth_timestamp='+ts+'&oauth_version=1.0',
					signatures:{
						api_key: key,
						shared_secret: secret
					}
				}

    			oauth.setAction(method)
    			var o = oauth.sign(config)
    			return o.signed_url

		}
		this.pollJob = (id, limit, interval, storeArray) => {
			if (limit > 0) {

				var type = 'GET',
				url = store.state.gallery + '/api/v1/jobs/' + id + '/',
				reqUrl = gallery.getSignedUrl(type, url)

				axios.get(reqUrl)
				.then((response) => {
					if (response.data.status == 'Running') {
						limit--
						this.chillax(interval)
					    .then(() => {
					        this.pollJob(id,limit,interval, storeArray)
					    });
			        } else {
			        	var fields = response.data.messages.filter((m) => m.status == 40 && m.toolId > 0).map(this.messageParse),
			        	records = response.data.messages.filter((m) => m.status == 41 && m.toolId > 0).map(this.messageParse),
			        	mapped = this.mapRecords(fields, records)
			        	this.commit(storeArray,mapped)
			        }
				})
				.catch((error) => {
					store.commit('updateApiError', error)
					console.log('Error!')
					this.commit(storeArray,'Error')
				})

			} else {
				store.commit('updateApiError', 'Limit reached before job finished')
				store.commit('updateOutput', 'Limit reached before job finished')
				console.log('Timeout!')
				this.commit(storeArray,'Timeout')
			}
		}
		this.chillax = ms => new Promise((r, j)=>setTimeout(r, ms))
		this.messageParse = m => { return m.text.slice(1, m.text.length-1).replace(/^"(.+(?="$))"$/, '$1').split('","') }
		this.mapRecords = (fields, records) => {
			return records.map(el => {
				return fields[0].reduce((prev, curr, index) => {
					prev[curr] = el[index]
					return prev
				}, {})
			})
		}
		this.commit = (storeArray, data) => {
			// console.log(storeArray)
			switch(storeArray) {
			    case 'sessions':
					store.commit('updateSessions', data.map(r => {
						r.SessionCount = Number(r.SessionCount)
						return r
					}))
		    		store.commit('updateSessionsLoading', false)        
			        break;
			    case 'users':
			        store.commit('updateUsers', data)
		    		store.commit('updateUsersLoading', false)
			        break;
			    case 'jobs':
			        store.commit('updateJobs', data)
		    		store.commit('updateJobsLoading', false)
			        break;
			    case 'results':
			        store.commit('updateResult', data)
			        console.log('Updated results in store')
		    		// store.commit('updateJobsLoading', false)
			        break;
			    default:
			        // Hmmm
			}
		}
		Vue.prototype.$gallery = {

			tally (arr, el) {
				return arr
					.map( a => { return a[el] })
				    .reduce( (tally, key) => {
				  		tally[key] = (tally[key] || 0) + 1 
				  		return tally
					} , {})
			},
			arrPairs (a) {
				return Object.keys(a).map(function(n){
			        return { name: n, value: a[n] }
			    })
			},
			divorce(arr) {
				var k=[]
				var v=[]
				for (var x in arr) {
				   k.push(x)
				   v.push(arr[x])
				}
				return { keys: k, vals: v }
			},
		    getQuestions (appId) {

				var type ='GET',
				url = store.state.gallery + '/api/v1/workflows/' + appId + '/questions/',
				reqUrl = gallery.getSignedUrl(type, url)

				axios.get(reqUrl)
				.then((response) => {
					store.commit('updateQuestions', response.data)
				})
				.catch((error) => {
					store.commit('updateApiError', error)
				})

		    },
		    getSessions () {

		    	store.commit('updateSessionsLoading', true)
		    	// store.commit('updateSessions', [])

				var resource = 'sessions',
				appId = store.state.mongodb.app,
				type = 'POST',
				url = store.state.gallery + '/api/v1/workflows/' + appId + '/jobs/',
				reqUrl = gallery.getSignedUrl(type, url),
				mongoServer = store.state.mongodb.server.replace('https://','').replace('http://',''),
				questions = {
				  "questions": [
				  	{ "name": "resource", "value": resource },
				    { "name": "search", "value": "" },
				    { "name": "server", "value": mongoServer },
				    { "name": "port", "value": store.state.mongodb.port },
				    { "name": "gallery", "value": store.state.mongodb.gallerydb },
				    { "name": "service", "value": store.state.mongodb.servicedb },
				    { "name": "user", "value": store.state.mongodb.user },
				    { "name": "pass", "value": store.state.mongodb.pass }
				  ]
				}

				axios({
				  method: type,
				  url: reqUrl,
				  data: questions
				})
				.then((response) => {
					store.commit('updateJob', response.data.id)
					gallery.pollJob(response.data.id,50,300,resource)
				})
				.catch((error) => {
					store.commit('updateApiError', error)
					store.commit('updateSessionsLoading', false)
				})

		    },
			getUsers () {

		    	store.commit('updateUsersLoading', true)
		    	// store.commit('updateUsers', [])

				var resource = 'users',
				appId = store.state.mongodb.app,
				type = 'POST',
				url = store.state.gallery + '/api/v1/workflows/' + appId + '/jobs/',
				reqUrl = gallery.getSignedUrl(type, url),
				mongoServer = store.state.mongodb.server.replace('https://','').replace('http://',''),
				questions = {
				  "questions": [
				  	{ "name": "resource", "value": resource },
				    { "name": "search", "value": "" },
				    { "name": "server", "value": mongoServer },
				    { "name": "port", "value": store.state.mongodb.port },
				    { "name": "gallery", "value": store.state.mongodb.gallerydb },
				    { "name": "service", "value": store.state.mongodb.servicedb },
				    { "name": "user", "value": store.state.mongodb.user },
				    { "name": "pass", "value": store.state.mongodb.pass }
				  ]
				}

				axios({
				  method: type,
				  url: reqUrl,
				  data: questions
				})
				.then((response) => {
					// console.log('Job ID: ' + response.data.id)
					store.commit('updateJob', response.data.id)
					gallery.pollJob(response.data.id,50,300,resource)
				})
				.catch((error) => {
					store.commit('updateApiError', error)
					store.commit('updateUsersLoading', false)
				})

		    },
		    getJobs () {

		    	store.commit('updateJobsLoading', true)
		    	// store.commit('updateJobs', [])

				var resource = 'jobs',
				appId = store.state.mongodb.app,
				type = 'POST',
				url = store.state.gallery + '/api/v1/workflows/' + appId + '/jobs/',
				reqUrl = gallery.getSignedUrl(type, url),
				mongoServer = store.state.mongodb.server.replace('https://','').replace('http://',''),
				questions = {
				  "questions": [
				  	{ "name": "resource", "value": resource },
				    { "name": "search", "value": "" },
				    { "name": "server", "value": mongoServer },
				    { "name": "port", "value": store.state.mongodb.port },
				    { "name": "gallery", "value": store.state.mongodb.gallerydb },
				    { "name": "service", "value": store.state.mongodb.servicedb },
				    { "name": "user", "value": store.state.mongodb.user },
				    { "name": "pass", "value": store.state.mongodb.pass }
				  ]
				}

				axios({
				  method: type,
				  url: reqUrl,
				  data: questions
				})
				.then((response) => {
					store.commit('updateJob', response.data.id)
					gallery.pollJob(response.data.id,50,300,resource)
				})
				.catch((error) => {
					console.log(error)
					store.commit('updateApiError', error)
					store.commit('updateUsersLoading', false)
				})

		    },
			getResult (jobId) {

		    	// store.commit('updateJobsLoading', true)
		    	// store.commit('updateJobs', [])
		    	// console.log('$gallery confirms job id: ' + jobId)
				var resource = 'results',
				appId = store.state.mongodb.app,
				type = 'POST',
				url = store.state.gallery + '/api/v1/workflows/' + appId + '/jobs/',
				reqUrl = gallery.getSignedUrl(type, url),
				mongoServer = store.state.mongodb.server.replace('https://','').replace('http://',''),
				questions = {
				  "questions": [
				  	{ "name": "resource", "value": resource },
				    { "name": "search", "value": jobId },
				    { "name": "server", "value": mongoServer },
				    { "name": "port", "value": store.state.mongodb.port },
				    { "name": "gallery", "value": store.state.mongodb.gallerydb },
				    { "name": "service", "value": store.state.mongodb.servicedb },
				    { "name": "user", "value": store.state.mongodb.user },
				    { "name": "pass", "value": store.state.mongodb.pass }
				  ]
				}

				axios({
				  method: type,
				  url: reqUrl,
				  data: questions
				})
				.then((response) => {
					// console.log('Call job id = ' + response.data.id)
					store.commit('updateJob', response.data.id)
					gallery.pollJob(response.data.id,50,300,resource)
				})
				.catch((error) => {
					store.commit('updateApiError', error)
					// store.commit('updateUsersLoading', false)
				})

		    },
		}

	}

}

export default gallery