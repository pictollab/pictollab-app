// import CircularBuffer from '~/assets/js/utils/CircularBuffer'
import AudioEngine from '~/assets/js/audio/base'

export const state = () => ({
  feed: [],
  filter: {
    active: 0,
    list: [ '', '_1977', 'gingham', 'moon', 'nashville', 'valencia' ]
  },
  log: {
    stats: {
      connectionTime: Date.now(),
      pageVisits: {
        '/': 0,
        '/app': 0,
        '/feed': 0,
        '/art': 0,
        '/data': 0
      },
      interactions: {
        photo: {
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
    id: null
  },
  version: '0.9.0'
})

export const mutations = {
  // --- Client browser information
  BROWSER_SET_NAME ({ user }, name) { user.browser.name = name },
  BROWSER_SET_VERSION ({ user }, version) { user.browser.version = version },
  BROWSER_SET_MOBILE ({ user }, mobile) { user.browser.isMobile = mobile },
  BROWSER_SET_OS ({ user }, OS) { user.browser.OS = OS },
  // --- CSSGram filter
  FILTER_RESET ({ filter }) { filter.active = 0 },
  FILTER_NEXT ({ filter }) { filter.active = ++filter.active % filter.list.length },
  FILTER_PREV ({ filter }) { filter.active = (--filter.active + filter.list.length) % filter.list.length },
  // --- Client image feed
  FEED_PUSH ({ feed }, data) { feed.push(data) },
  // --- Client event log
  LOG_TIMELINE_PUSH ({ log }, data) { log.timeline.push(Object.assign({ timestamp: Date.now() }, data)) },
  LOG_PAGE_VISIT ({ log }, page) { log.stats.pageVisits[page]++ },
  LOG_PHOTO_CAPTURE ({ log }) { log.stats.interactions.photo.captured++ },
  LOG_PHOTO_UPLOAD ({ log }) { log.stats.interactions.photo.uploaded++ },
  LOG_VIDEO_CAPTURE ({ log }) { log.stats.interactions.video.captured++ },
  LOG_VIDEO_UPLOAD ({ log }) { log.stats.interactions.video.uploaded++ },
  // --- Vue-Socket.io bindings
  // SOCKET_FEED_UPDATE ({ feed }, data) { feed.push(data[0]) },
  SOCKET_MONDRIAN_UPDATE ({ mondrian }, data) { },
  SOCKET_SET_ID ({ user }, id) { user.id = id[0] }
}

export const actions = {
  // --- Audio Engine actions
  'audio/init' ({ dispatch}) {
    AudioEngine.init()
  },
  'audio/mute' ({ dispatch }) {
    if (AudioEngine.isActive())
      AudioEngine.mute()
  },
  'audio/unmute' ({ dispatch }) {
    if (AudioEngine.isActive())
      AudioEngine.unmute()
  },
  'audio/blur' ({ dispatch }) {
    if (AudioEngine.isActive())
      AudioEngine.blur()
  },
  'audio/focus' ({ dispatch }) {
    if (AudioEngine.isActive())
      AudioEngine.focus()
  },
  'audio/pause' ({ dispatch }) {
    if (AudioEngine.isActive())
      AudioEngine.pause()
  },
  'audio/resume' ({ dispatch }) {
    if (AudioEngine.isActive())
      AudioEngine.resume()
  },
  'audio/nextPreset' ({ dispatch }) {
    if (AudioEngine.isActive())
      AudioEngine.nextPreset()
  },
  'audio/resetPreset' ({ dispatch }) {
    if (AudioEngine.isActive())
      AudioEngine.setPreset(0)
  },
  'audio/setPreset' ({ dispatch }, p) {
    if (AudioEngine.isActive())
      AudioEngine.setPreset(p)
  },
  'audio/prevPreset' ({ dispatch }) {
    if (AudioEngine.isActive())
      AudioEngine.prevPreset()
  },
  'audio/rgb' ({ dispatch }, rgb) {
    if (AudioEngine.isActive())
      AudioEngine.mapRGB(rgb)
  },
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
    try { this._vm.$socket.emit('event', event) } catch(e) { console.log(e) }
  },
  'socket/register' ({ state }, data) { 
    try { this._vm.$socket.emit('register', data) } catch(e) { console.log(e) }
  },
  'socket/upload' ({ dispatch, state }, data) { 
    try { this._vm.$socket.emit('upload', data) } catch(e) { console.log(e) }
  },
  // --- Client logging
  'log/event' ({ commit, dispatch, state }, data) {
    let event
    switch (data.type) {
      case 'capture':
        event = { type: 'capture', data: null, timestamp: { client: Date.now() } }
        commit('LOG_PHOTO_CAPTURE')
        commit('LOG_TIMELINE_PUSH', event)
        dispatch('socket/event', event)
        break
      case 'connect':
        const { user } = state
        const { browser, id } = user
        event = { type: 'connect', data: null, timestamp: { client: Date.now() } }
        commit('LOG_TIMELINE_PUSH', event)
        dispatch('socket/register', { browser, id, log: [] })
        break
      case 'nav':
        event = { type: 'nav', data: data.to, timestamp: { client: Date.now() } }
        commit('LOG_PAGE_VISIT', data.to)
        commit('LOG_TIMELINE_PUSH', event)
        dispatch('socket/event', event)
        break
      case 'upload':
        console.log(data.img.preset)
        event = { type: 'upload', data: data.img, timestamp: { client: Date.now(), server: null } }
        commit('LOG_PHOTO_UPLOAD')
        commit('LOG_TIMELINE_PUSH', event)
        commit('FEED_PUSH', data.img)
        dispatch('socket/upload', event)
        break
    }
  }
}

export const getters = {
  audio: () => AudioEngine,
  filter: ({ filter }) => filter.list[filter.active]
}
