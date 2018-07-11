// https://gist.github.com/olvado/1048628
// https://codepen.io/influxweb/pen/LpoXba

export default function (img) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const height = canvas.height = 1280
  const width = canvas.width = 720
  const pixelInterval = 5

  let rgb = { r: 0, g: 0, b: 0, brightness: 0 }

  context.drawImage(img, 0, 0, width, height)
  const { data } = context.getImageData(0, 0, width, height)

  let count = 0
  let avg = 0
  for (let i = 0; i < data.length; i += pixelInterval * 4) {
    rgb.r += data[i]
    rgb.g += data[i + 1]
    rgb.b += data[i + 2]

    avg = ~~((rgb.r + rgb.b + rgb.g) / 3)

    count++
  }

  rgb.r = ~~(rgb.r / count || 1)
  rgb.g = ~~(rgb.g / count || 1)
  rgb.b = ~~(rgb.b / count || 1)
  rgb.brightness = avg / count

  return rgb
}
