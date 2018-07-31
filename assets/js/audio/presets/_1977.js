export default {
  synth: {
    notes: [
      [ 'G1', 'G2', 'D4', 'B4' ],
      [ 'A2', 'G3', 'D4', 'B#5' ],
      [ 'A3', 'A4', 'D4', 'C#5' ]
    ],
    params: {
      "oscillator" : {
        "type" : "fatsawtooth",
        "count" : 3,
        "spread" : 30
      },
      "envelope": {
        "attack": 3,
        "decay": 0.1,
        "sustain": 1,
        "release": 1,
        "attackCurve" : "exponential"
      }
    }
  },
  effects: [
    { type: 'PitchShift',  params: { 
        wet: 1, 
        pitch: 2, 
        windowSize: 0.04, 
        delayTime: 0.03, 
        feedback: 0.5 
    }},
    // { type: 'Vibrato', params: {
    //     wet: 0, 
    //     frequency: 2.3, 
    //     depth: 0.4, 
    //     type: 'triangle'
    // }},
    { type: 'Chorus', params: { 
        wet: 0,
        delayTime: 3.5,
        depth: 0.7, 
        spread: 180,
        type: 'sine' 
    }},
    // { type: 'FeedbackDelay', params: {
    //     wet: 0,
    //     delayTime: '8n', 
    //     feedback: 0.4
    // }},
    { type: 'Freeverb', params: {
        wet: 0.5,
        roomSize: 0.95,
        dampening: 1200
    }}
  ]
}