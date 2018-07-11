import Tuna from 'tunajs'

import presets from './presets'
import synth from './synth'

import ObjectSort from '../utils/ObjectSort'

export default {
  // --- Private vars
  _active: false,
  _context: null,
  _output: null,
  _preset: 0,
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
  active () { return this._active },
  nextPreset () { 
    this._preset = ++this._preset % presets.length 
    this._synth.updatePreset(this._preset)
  },
  prevPreset () { 
    this._preset = (--this._preset + presets.length) % presets.length 
    this._synth.updatePreset(this._preset)
  },
  mapRGB (rgb) {
    const { r, g ,b } = rgb
    const sorted = ObjectSort.largest(rgb)
    const gain = [ r / 255, r / 255, g / 255, b / 255 ]
    const chord = sorted[0] === 'brightness'
      ? sorted[1] === 'r'
        ? 0
        : sorted[1] === 'b'
          ? 1
          : 2
      : sorted[0] === 'r'
        ? 0
        : sorted[0] === 'b'
          ? 1
          : 2

    this._synth.updateGain(gain)
    this._synth.updateNote(chord)
  }
}
