(function () {
  var index = {
    init: function () {
      var that = this
      this.video = document.getElementById('video')
      // setInterval(function () {
      //   that.getVideoTime()
      // }, 1000)
      this.bindEvent()
    },
    getVideoTime: function () {
      var nowTime = this.video.currentTime
    },
    renderVideo: function () {
      var html = '<video id="video" src="./livetune feat 初音ミク「Redial」Music Video_final_ver.mp4" autoplay="true" preload="true"></video>'
      var element = document.createElement('div')
      element.innerHTML = html
      document.body.appendChild(element.childNodes[0])
      this.video = document.getElementById('video')
    },
    bindEvent: function () {
      var that = this
      this.video.onended = function () {
        // that.video.className = 'end'
        // that.renderVideo()
      }.bind(this)
      this.video.addEventListener('webkitTransitionEnd', function () {
        let that = this
        that.video.remove()
        that.renderVideo()
        that.init()

      }.bind(this))
    }
  }
  index.init()
}())
