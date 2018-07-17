export default {
  synth: {
    notes: [
      [ 'A2', 'E2', 'C3', 'G3' ],
      [ 'A2', 'E2', 'C3', 'F3' ],
      [ 'A2', 'F2', 'C3', 'F3' ]
    ],
    params: {
      "oscillator": {
        "partials": [ 1, 0, 2, 0, 3 ]
      },
      "envelope": {
        "attack": 0.001,
        "decay": 1.2,
        "sustain": 1,
        "release": 1.2
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
      wet: 1, 
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