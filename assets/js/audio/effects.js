import Tone from 'tone'

import presets from './presets'

export default {
  // --- Private vars
  _context: null,
  _tone: null,
  _input: null,
  _chain: [],
  _preset: null,
  _output: null,
  // --- Public methods
  init (context, preset = 0) {
    this._context = context
    this._preset = presets[preset].effects

    this._input = this._context.createGain()
    this._input.gain.value = 0.5

    this._preset.forEach(fx => {
      this._chain.push(new Tone[fx.type](fx.params))
    })

    this._output = this._context.createGain()
    this._output.gain.value = 0.5

    this._input.connect(this._chain[0])
    for (let i = 0; i < this._chain.length; i++) {
      if (i + 1 < this._chain.length) {
        this._chain[i].connect(this._chain[i + 1])
      }
    }
    this._chain[this._chain.length - 1].connect(this._output)
  },
  connect (node) { this._output.connect(node) },
  input () { return this._input },
  updatePreset (preset) {
    this._preset = presets[preset].effects
    this._chain.forEach((fx, i) => {
      fx.wet.exponentialRampTo(this._preset[i].params.wet, 1)
    })
  }
}