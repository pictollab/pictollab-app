export default class CircularBuffer extends Array {
  constructor (size, ...items) {
    super(...items)
    this._size = size
  }

  push (item) {
    if (this.length >= this._size) {
      this.shift()
    }
    super.push(item)
  }
}
