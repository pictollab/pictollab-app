export default {
  largest (obj) {
    return Object.keys(obj)
      .sort((x, y) => {
        return obj[y] - obj[x]
      })
  },
  smallest (obj) {
    return Object.keys(obj)
      .sort((x, y) => {
        return obj[x] - obj[y]
      })
  },
}