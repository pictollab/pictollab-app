import CircularBuffer from '~/assets/js/utils/CircularBuffer'

export const state = () => ({
  feed: new CircularBuffer(5),
  filter: {
    active: 0,
    list: [
      '',
      '_1977',
      'gingham',
      'moon',
      'nashville',
      'valencia'
    ]
  },
  log: {
    stats: {
      connectionTime: Date.now(),
      pageVisits: {
        '/': 0,
        '/camera': 0,
        '/feed': 0,
        '/canvas': 0,
        '/DEBUG/data': 0
      },
      interactions: {
        photo: {
          captured: 0,
          uploaded: 0
        },
        video: {
          captured: 0,
          uploaded: 0
        }
      }
    },
    timeline: []
  },
  user: {
    browser: {
      name: '',
      version: '',
      isMobile: false,
      OS: ''
    },
    consent: false,
    id: null
  }
})

export const mutations = {
  // --- Client browser information
  BROWSER_SET_NAME ({ user }, name) { user.browser.name = name },
  BROWSER_SET_VERSION ({ user }, version) { user.browser.version = version },
  BROWSER_SET_MOBILE ({ user }, mobile) { user.browser.isMobile = mobile },
  BROWSER_SET_OS ({ user }, OS) { user.browser.OS = OS },
  // --- CSSGram filter
  FILTER_NEXT ({ filter }) { filter.active = ++filter.active % filter.list.length },
  FILTER_PREV ({ filter }) { filter.active = (--filter.active + filter.list.length) % filter.list.length },
  // --- User consent to access camera
  USER_CONSENT ({ user }) { user.consent = true },
  // --- Client event log
  LOG_TIMELINE_PUSH ({ log }, data) { log.timeline.push(Object.assign({ timestamp: Date.now() - log.stats.connectionTime }, data)) },
  LOG_PAGE_VISIT ({ log }, page) { log.stats.pageVisits[page]++ },
  LOG_PHOTO_CAPTURE ({ log }) { log.stats.interactions.photo.captured++ },
  LOG_PHOTO_UPLOAD ({ log }) { log.stats.interactions.photo.uploaded++ },
  LOG_VIDEO_CAPTURE ({ log }) { log.stats.interactions.video.captured++ },
  LOG_VIDEO_UPLOAD ({ log }) { log.stats.interactions.video.uploaded++ },
  // --- Vue-Socket.io bindings
  SOCKET_FEED_UPDATE ({ feed }, data) { feed.push(data[0]) },
  SOCKET_MONDRIAN_UPDATE ({ mondrian }, data) { },
  SOCKET_SET_ID ({ user }, id) { user.id = id[0] }
}

export const actions = {
  // --- User actions
  'user/consent' ({ commit }) { commit('USER_CONSENT') },
  'user/setBrowser' ({ commit }, { name, version, mobile, os }) {
    commit('BROWSER_SET_NAME', name)
    commit('BROWSER_SET_VERSION', version)
    commit('BROWSER_SET_MOBILE', mobile)
    commit('BROWSER_SET_OS', os)
  },
  // --- Vue-Socket.io actions
  'socket/event' ({ state }, event) { 
    if (!process.env.NODE_ENV === 'dev')
      this._vm.$socket.emit('event', event) 
  },
  'socket/register' ({ state }, data) { 
    if (!process.env.NODE_ENV === 'dev')
      this._vm.$socket.emit('register', data) 
  },
  'socket/upload' ({ dispatch, state }, data) { 
    if (!process.env.NODE_ENV === 'dev')
      this._vm.$socket.emit('upload', data) 
  },
  // --- Client logging
  'log/event' ({ commit, dispatch, state }, data) {
    let event
    switch (data.type) {
      case 'capture':
        event = { type: 'capture', data: null, timestamp: { client: Date.now() - state.log.stats.connectionTime - state.log.stats.connectionTime } }
        commit('LOG_PHOTO_CAPTURE')
        commit('LOG_TIMELINE_PUSH', event)
        dispatch('socket/event', event)
        break
      case 'connect':
        const { user } = state
        const { browser, id } = user
        event = { type: 'connect', data: null, timestamp: { client: Date.now() - state.log.stats.connectionTime } }
        commit('LOG_TIMELINE_PUSH', event)
        dispatch('socket/register', { browser, id, log: [] })
        break
      case 'nav':
        event = { type: 'nav', data: data.to, timestamp: { client: Date.now() - state.log.stats.connectionTime } }
        commit('LOG_PAGE_VISIT', data.to)
        commit('LOG_TIMELINE_PUSH', event)
        dispatch('socket/event', event)
        break
      case 'upload':
        event = { type: 'upload', data: null, timestamp: { client: Date.now() - state.log.stats.connectionTime } }
        commit('LOG_PHOTO_UPLOAD')
        commit('LOG_TIMELINE_PUSH', event)
        dispatch('socket/upload', data.img)
        break
    }
  }
}

export const getters = {
  filter: ({ filter }) => filter.list[filter.active]
}
