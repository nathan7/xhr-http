var hyperquestionable = require('hyperquestionable')

module.exports =
function xhr(options, callback, errback) {
  if (typeof options === 'string')
    return xhr({ url: options }, callback, errback)

  var realOptions = { uri: options.url }
  if (options.method)
    realOptions.method = options.method
  if (options.headers)
    realOptions.headers = options.headers

  var req = hyperquestionable(realOptions, onRes)
  if (options.data)
    req.write(options.data)

  function onRes(err, data, res) {
    if (err) {
      if (typeof errback !== 'function') return
      if (res && res.statusCode) err.status = res.statusCode
      errback(err)
    }
    if (typeof callback !== 'function') return
    callback({ responseType: 'string', readyState: 4, response: data, responseText: data, responseXML: null, status: statusCode, timeout: 0 })
  }
}
