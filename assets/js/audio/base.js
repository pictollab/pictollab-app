import Tone from 'tone'

import presets from './presets'
import synth from './synth'
import effects from './effects'

import ObjectSort from '../utils/ObjectSort'

export default {
  // --- Private vars
  _active: false,
  _context: null,
  _output: null,
  _preset: 0,
  _synth: null,
  _effects: null,
  _tone: null,
  _muted: false,
  // --- Public Methods
  mute () { 
    this._muted = true
    this._output.gain.linearRampToValueAtTime(0, this._context.currentTime + 0.1) 
  },
  unmute () { 
    this._muted = false
    this._output.gain.linearRampToValueAtTime(0.75, this._context.currentTime + 0.1) 
  },
  pause () { this._context.suspend() },
  resume () { this._context.resume() },
  blur () { this._output.gain.linearRampToValueAtTime(0, this._context.currentTime + 0.1)  },
  focus () { this._output.gain.linearRampToValueAtTime(0.75, this._context.currentTime + 0.1) },
  isActive () { return this._active },
  isMuted () { return this._muted },
  init () {
    this._tone = new Tone()
    this._context = this._tone.context

    this._output = this._context.createGain()
    this._output.gain.value = 0.5
    this._output.connect(this._context.destination)

    this._synth = synth
    this._synth.init(this._context)

    this._effects = effects
    this._effects.init(this._context)

    this._synth.connect(this._effects.input())
    this._effects.connect(this._output)

    this._active = true
  },
  nextPreset () { 
    this._preset = ++this._preset % presets.length 
    this._synth.updatePreset(this._preset)
    this._effects.updatePreset(this._preset)
  },
  prevPreset () { 
    this._preset = (--this._preset + presets.length) % presets.length 
    this._synth.updatePreset(this._preset)
    this._effects.updatePreset(this._preset)
  },
  setPreset (p) {
    this._preset = p < 0
      ? (p + presets.length) % presets.length 
      : p % presets.length
    this._synth.updatePreset(this._preset)
    this._effects.updatePreset(this._preset)
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
