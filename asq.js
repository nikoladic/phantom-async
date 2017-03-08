const ASQ = require('asynquence')
var fs = require('fs')
const phantom = require('phantom')
const Q = require('q')

ASQ()
  .seq(function (done) { done(phantom.create()) })
  .seq(function (done, instance) { done(instance.createPage()) })
  .then(
    function (done, page) {
      page.on('onResourceRequested', function (requestData) {
        console.info('Requesting', requestData.url)
        done(page)
      })
    }
  )
  .then(
    function (done, page) {
      page.open('boilerplate.html')
      done(page)
    }
  )
  .then(
    function (done, page) {
      page.evaluate(function () {
        console.log(SVG('svg').size(300, 300).rect(100, 100).fill('#f06').svg())
        done(page)
      })
    }
  )
  .then(
    function (done, page) {
      page.evaluate(function () {
        console.log(document.getElementById('svg').innerHTML)
        done()
      })
    }
  )
  // .then(instance.exit())
