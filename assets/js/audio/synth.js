import Voice from './voice'

export default {
  // --- Private vars
  _context: null,
  _voices: [],
  _mixer: null,
  // --- Public methods
  init (context) {
    this._context = context

    this._mixer = this._context.createGain()
    this._mixer.gain.value = 0.5

    for (let i = 0; i < 4; i++) {
      this._voices.push(new Voice(this._context, i, 0))
      this._voices[i].connect(this._mixer)
    }
  },
  connect (node) { this._mixer.connect(node) }
}