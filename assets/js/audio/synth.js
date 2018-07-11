import Voice from './voice'

export default {
  // --- Private vars
  _context: null,
  _voices: [],
  _mixer: null,
  // --- Public methods
  init (context, preset) {
    this._context = context

    this._mixer = this._context.createGain()
    this._mixer.gain.value = 0.25

    for (let i = 0; i < 4; i++) {
      this._voices.push(new Voice(this._context, i, preset))
      this._voices[i].connect(this._mixer)
    }
  },
  connect (node) { this._mixer.connect(node) },
  updatePreset (preset) {
    for (let i = 0; i < 4; i++) {
      this._voices[i].updatePreset(preset)
    }
  },
  updateGain (gain) {
    for (let i = 0; i < 4; i++) {
      this._voices[i].updateGain(gain[i])
    }
  },
  updateNote (note) {
    for (let i = 0; i < 4; i++) {
      this._voices[i].updateNote(note)
    }
  }
}