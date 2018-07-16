import presets from './presets'

export default class Voice {
  // --- Private vars
  // _context
  // _id
  // _osc
  // _gain
  // _preset
  // --- Private methods
  _updateType () { this._osc.type = this._preset.type }
  // --- Public methods
  constructor (context, id, preset = 0) {
    this._context = context
    this._id = id
    this._preset = presets[preset].voices[this._id]

    this._osc = this._context.createOscillator()
    this._osc.type = this._preset.type
    this._osc.frequency.value = this._preset.notes[0]
 
    this._gain = this._context.createGain()
    this._gain.gain.value = 0

    this._osc.connect(this._gain)
    this._osc.start()
  }
  connect (node) { this._gain.connect(node) }
  updatePreset (preset) {
    this._preset = presets[preset].voices[this._id]
    this._updateType()
  }
  updateGain (gain) {
    const t = this._context.currentTime + 0.9
    this._gain
      .gain
      .linearRampToValueAtTime(gain, t)
  }
  updateNote (note) { 
    const t = this._context.currentTime + 0.1
    this._osc
      .frequency
      .exponentialRampToValueAtTime(this._preset.notes[note], t)
  }
}
