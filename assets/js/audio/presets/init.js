export default {
  voices: [
    { type: 'sine', notes: [ 98, 110, 146.83 ] },
    { type: 'sine', notes: [ 196, 220, 293.66 ] },
    { type: 'sine', notes: [ 293.66, 293.66, 293.66 ] },
    { type: 'sine', notes: [ 493.88, 554.37, 730.99 ] },
  ],
  effects: [
    { type: 'PitchShift', bypass: false, params: { "pitch": 2, "windowSize": 0.04, "delayTime": 0.03, "feedback": 0.5 } },
    { type: 'Vibrato', byrpass: false, params: { "frequency": 2.3, "depth": 0.4, "type": "triangle" } },
    { type: 'Chorus', bypass: false, params: { delayTime: 3.5, depth: 0.7, spread: 180, type: 'sine' } },
    { type: 'FeedbackDelay', bypass: false, params: { "delayTime" : "8n",  "feedback" : 0.4 } },
    { type: 'Freeverb', bypass: false, params: { "roomSize": 0.95, "dampening": 1200 } }
  ]
}