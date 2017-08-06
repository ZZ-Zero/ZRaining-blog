(function () {
  var index = {
    init: function () {
      this.setCanvas()
    },
    setCanvas: function () {
      var canvas = document.getElementById('canvas')
      var ctx
      if (canvas.getContext) {
        ctx = canvas.getContext('2d')
      } else {
        return
      }
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      var image = new Image()
      image.onload = function () {
        var imgWidth = image.width
        var imgHeight = image.height
        ctx.drawImage(image, 0, 0, canvas.width, canvas.width/imgWidth*imgHeight)

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        var particles = []
        function calculate() {
          var cols = parseInt(canvas.width)
          var rows = parseInt(canvas.height)
          var particleW = parseInt(canvas.width / cols)
          var particleH = parseInt(canvas.height / rows)

          var pos = 0
          var parX, parY
          var data = imageData.data
          console.log(data, cols, rows)
          for (var i = 0; i <= cols; i++) {
            for (var x = 0; x <= rows; x++) {
              pos = [(x*particleH-1)*canvas.width + (i*particleW-1)]*4
              if (data[pos] < 20) {
                var particle = {
                  x: i*particleW + (Math.random() - 0.5)*20,
                  y: x*particleH + (Math.random() - 0.5)*20,
                  fillStyle: '#eee'
                }
                particles.push(particle)
              }
              if (i == cols && x == rows) {
                console.log('f')
                draw()
              }
            }
          }
        }
        function draw () {
          console.log(particles)
          ctx.clearRect(0,0,canvas.width,canvas.height)
          var len = particles.length
          var temp
          for (var i = 0; i < len; i++) {
            temp = particles[i]
            ctx.fillStyle = temp.fillStyle
            ctx.fillRect(temp.x, temp.y, 1, 1)
          }
        }
        calculate()
      }
      image.src = './test1.jpg'
    }
  }
  index.init()
}())
