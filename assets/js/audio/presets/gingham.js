export default {
  synth: {
    notes: [
      [ 'G1', 'G2', 'D4', 'B4' ],
      [ 'A2', 'A3', 'D4', 'C#5' ],
      [ 'D3', 'D4', 'D4', 'F#5' ]
    ],
    params: {
      "oscillator": {
        "type": "fatcustom",
      	"partials" : [0.2, 1, 0, 0.5, 0.1],
      	"spread" : 40,
      	"count" : 3
      },
      "envelope": {
        "attack": 0.001,
        "decay": 1.6,
        "sustain": 1,
        "release": 1.6
      }
    }
  },
  effects: [
    { type: 'PitchShift',  params: { 
      wet: 0, 
      pitch: 2, 
      windowSize: 0.04, 
      delayTime: 0.03, 
      feedback: 0.5 
  }},
  { type: 'Vibrato', params: {
      wet: 0, 
      frequency: 2.3, 
      depth: 0.4, 
      type: 'triangle'
  }},
  { type: 'Chorus', params: { 
      wet: 0,
      delayTime: 3.5,
      depth: 0.7, 
      spread: 180,
      type: 'sine' 
  }},
  { type: 'FeedbackDelay', params: {
      wet: 1,
      delayTime: '8n', 
      feedback: 0.4
  }},
  { type: 'Freeverb', params: {
      wet: 1,
      roomSize: 0.95,
      dampening: 1200
  }}
  ]
}