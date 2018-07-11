import Tuna from 'tunajs'

import synth from './synth'

export default {
  // --- Private vars
  _active: false,
  _context: null,
  _output: null,
  _synth: null,
  _tuna: null,
  // --- Public Methods
  init () {
    this._context = new AudioContext()
    this._tuna = new Tuna(this._context)

    this._output = this._context.createGain()
    this._output.gain.value = 0.75
    this._output.connect(this._context.destination)

    this._synth = synth
    this._synth.init(this._context)
    this._synth.connect(this._output)

    this._active = true
  },
  mute () { this._output.gain.value = 0 },
  unmute () { this._output.gain.value = 0.75 },
  pause () { this._context.suspend() },
  resume () { this._context.resume() },
  active () { return this._active }
}